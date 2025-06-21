import { Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { UserComponent } from '../user/user.component';
import { LoginComponent } from '../login/login.component';
import { LayoutComponent } from '../layout/layout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'',
        component: LayoutComponent,
        canActivate:[authGuard],
        children:[
            {
                path:'admin',
                component: AdminComponent
            },
            {
                path:'user',
                component: UserComponent
            }
        ]
    }
];
