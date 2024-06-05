import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.css'
})
export class TemplateDrivenFormComponent {

  onSubmit(form: any): void {
    console.log("Form: ",form);
    console.log('Form Data: ',form.value);
  }

  dob: any;
  age: number | null = null;

   ageFromDOB(dob: any): number {
      let td = new Date();
      let db = new Date(dob);
      let age = td.getFullYear() - db.getFullYear();

      if (td.getMonth() < db.getMonth() || (td.getMonth() === db.getMonth() && td.getDate() < db.getDate())) {
        age--;
      }

      return age;
    }

    onDateChange(event: any): void {
      this.dob = event.target.value;
      this.age = this.ageFromDOB(this.dob);
    }
}
