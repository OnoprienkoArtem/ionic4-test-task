import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetsPage } from './assets.page';
import { MyAssetsComponent } from './my-assets/my-assets.component';

const routes: Routes = [
    {
        path: '',
        component: AssetsPage,
        children: [
            {
                path: '',
                redirectTo: 'my',
                pathMatch: 'full'
            },
            {
                path: 'my',
                component: MyAssetsComponent
            },
            {
                path: 'opportunities',
                loadChildren: () =>
                    import('../opportunities/opportunities.module').then(
                        m => m.OpportunitiesPageModule
                    )
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssetsRoutingModule {}
