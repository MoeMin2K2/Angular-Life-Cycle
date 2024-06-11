import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialUiDemoComponent } from './material-ui-demo/material-ui-demo.component';
import { MatTableDemoComponent } from "./mat-table-demo/mat-table-demo.component";
import { BookListComponent } from "./book-list/book-list.component";
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterLink, RouterLinkActive, RouterModule, HttpClientModule,
    MaterialUiDemoComponent, ReactiveFormsModule, RouterOutlet, ParentComponent, ChildComponent, TemplateDrivenFormComponent, ReactiveFormComponent, MatTableDemoComponent, BookListComponent]
})
export class AppComponent {
  title = 'life-cycle';
}
