import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingController, IonItemSliding } from '@ionic/angular';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem
} from '@angular/cdk/drag-drop';

import { Platform } from '@ionic/angular';

import { AssetsService } from '../assets.service';

@Component({
    selector: 'app-my-assets',
    templateUrl: './my-assets.component.html',
    styleUrls: ['./my-assets.component.scss']
})
export class MyAssetsComponent implements OnInit, OnDestroy {
    public assetsSegment = 'all';
    public first;
    public second;
    public dataFirst: Array<any> = [];
    public dataSecond: Array<any> = [];
    public bigDevice = this.platform.width() >= 1200 ? true : false;
    private assetsSub: Subscription;
    public loading;

    constructor(
        public assetsService: AssetsService,
        public loadingController: LoadingController,
        public platform: Platform
    ) {
        this.platform.resize.subscribe(() => {
            this.bigDevice = this.platform.width() >= 1200 ? true : false;
        });
    }

    async ngOnInit() {
        if (!localStorage.getItem('allData')) {
            this.loading = await this.loadingController.create({
                message: 'Data loading ...'
            });

            await this.loading.present();

            this.assetsSub = this.assetsService
                .getData()
                .pipe(
                    delay(3000),
                    finalize(async () => {
                        await this.loading.dismiss();
                    })
                )
                .subscribe((data: any) => {
                    console.log('exist data in local storage');
                    localStorage.setItem('allData', JSON.stringify(data));
                    localStorage.setItem('savingData', JSON.stringify([]));
                    this.dataFirst = JSON.parse(
                        localStorage.getItem('allData')
                    );
                    this.dataSecond = JSON.parse(
                        localStorage.getItem('savingData')
                    );
                });
        } else {
            this.dataFirst = JSON.parse(localStorage.getItem('allData'));
            this.dataSecond = JSON.parse(localStorage.getItem('savingData'));
        }
    }

    onFilterUpdate(e) {
        this.assetsSegment = e.detail.value;
    }

    removeItem(id: string, slidingItem: IonItemSliding, dataName) {
        console.log(dataName);
        slidingItem.close();
        this.loadingController
            .create({
                message: 'Removing...'
            })
            .then(loadingController => {
                loadingController.present();
                if (dataName === 'dataFirst') {
                    this.dataFirst = this.dataFirst.filter(d => d.id !== id);
                    localStorage.setItem(
                        'allData',
                        JSON.stringify(this.dataFirst)
                    );
                } else {
                    this.dataSecond = this.dataSecond.filter(d => d.id !== id);
                    localStorage.setItem(
                        'savingData',
                        JSON.stringify(this.dataSecond)
                    );
                }
                loadingController.dismiss();
            });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            localStorage.setItem('allData', JSON.stringify(this.dataFirst));
            localStorage.setItem('savingData', JSON.stringify(this.dataSecond));
        }
    }

    ngOnDestroy() {
        if (this.assetsSub) {
            this.assetsSub.unsubscribe();
        }
    }
}
