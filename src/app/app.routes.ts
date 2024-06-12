import { Routes } from '@angular/router';
import { MaterialUiDemoComponent } from './material-ui-demo/material-ui-demo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookListComponent } from './book-list/book-list.component';
import { securityGuard } from './security.guard';
import { WelcomeComponent } from './welcome/welcome.component';



export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent, canActivate: [securityGuard] },
    { path: 'login', component: MaterialUiDemoComponent },
    { path: 'book-list', component: BookListComponent, canActivate: [securityGuard] },
    // {path: 'book-list' , component : BookListComponent},
    // {path: 'logout', redirectTo: '/login', pathMatch: 'full'},
    // {path: 'book-list', loadChildren : () => import ('').then( m => )}
    { path: '**', component: PageNotFoundComponent }
];