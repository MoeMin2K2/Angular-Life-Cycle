import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material-ui-demo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './material-ui-demo.component.html',
  styleUrl: './material-ui-demo.component.css'
})
export class MaterialUiDemoComponent {
  form: FormGroup;
  isValid: boolean = false;

  user = {
    name: "Moe Min Oo",
    email: "moe@gmail.com",
    password: "P@ss1234"
  };

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]]
    });
  }

  comfirmDetails(detail: FormGroup): boolean {
    return (this.user.email === detail.get('email')?.value) && (this.user.password === detail.get('password')?.value);
  }

  isInvalid(field: string): boolean {
    const validation = this.form.get(field);
    if (validation && validation.invalid && (validation.dirty || validation.touched)) {
      return !this.isValid;
    } else
      return this.isValid;
  }

  invalidMessage(field: string): string {
    console.log("Field: ", field);
    const validation = this.form.get(field);
    if (validation && validation.errors) {
      if (validation.errors['required']) {
        return `Field is required`;
      } else if (validation.errors['minlength']) {
        const minLength = validation.errors['minlength'].requiredLength;
        return `Minimum length is ${minLength} characters`;
      } else if (validation.errors['maxlength']) {
        const maxlength = validation.errors['maxlength'].requiredLength;
        return `Maximum length is ${maxlength} characters`;
      } else if (validation.errors['pattern']) {
        switch (field) {
          case "email": return `Enter a valid ${field}.(eg. john@gmail.com)`;
          case "password": return `Password must be strong.(eg. @pp!3S)`;
          default: return '';
        }
      }
    }
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      if (this.comfirmDetails(this.form)) {
        this.snackBar.open(`Dear ${this.user.name}, you login successful!`, "Close", { duration: 3000 });
      } else {
        this.snackBar.open(`Oop! Something went wrong.`, "Close", { duration: 3000 });
      }
    }
  }
}
