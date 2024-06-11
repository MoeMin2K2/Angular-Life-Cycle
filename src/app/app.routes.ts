import { Routes } from '@angular/router';
import { MaterialUiDemoComponent } from './material-ui-demo/material-ui-demo.component';
import { BookListComponent } from './book-list/book-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export const routes: Routes = [
    {path:'', redirectTo: '/login', pathMatch: 'full'},
    {path:'login' , component: MaterialUiDemoComponent},
    {path: 'book-list' , component : BookListComponent},
    {path: '**', component: PageNotFoundComponent}
];
