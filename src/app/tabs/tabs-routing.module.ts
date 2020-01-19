import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../home/home.module').then(
                                m => m.HomePageModule
                            )
                    }
                ]
            },
            {
                path: 'spending',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../spending/spending.module').then(
                                m => m.SpendingPageModule
                            )
                    }
                ]
            },
            {
                path: 'assets',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../assets/assets.module').then(
                                m => m.AssetsPageModule
                            )
                    }
                ]
            },
            {
                path: 'payment',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../payment/payment.module').then(
                                m => m.PaymentPageModule
                            )
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {}
