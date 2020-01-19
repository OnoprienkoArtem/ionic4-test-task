import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetsRoutingModule } from './assets-routing.module';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { AssetsPage } from './assets.page';
import { MyAssetsComponent } from './my-assets/my-assets.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AssetsRoutingModule,
        DragDropModule
    ],
    declarations: [AssetsPage, MyAssetsComponent]
})
export class AssetsPageModule {}
