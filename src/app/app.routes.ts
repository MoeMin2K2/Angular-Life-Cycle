import { Routes } from '@angular/router';
import { securityGuard } from './security.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule), canActivate: [securityGuard] },
    { path: 'login', loadChildren: () => import('./material-ui-demo/material-ui-demo.module').then(m => m.MaterialUiDemoModule) },
    { path: 'book-list', loadChildren: () => import('./book-list/book-list.module').then(m => m.BookListModule), canActivate: [securityGuard] },
    { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) }
    // { path: 'welcome', loadChildren: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent), canActivate: [securityGuard] },
    // { path: 'login', loadChildren: () => import('./material-ui-demo/material-ui-demo.component').then(m => m.MaterialUiDemoComponent) },
    // { path: 'book-list', loadChildren: () => import('./book-list/book-list.component').then(m => m.BookListComponent), canActivate: [securityGuard] },
    // { path: '**', loadChildren: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }

];