import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material-ui-demo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './material-ui-demo.component.html',
  styleUrl: './material-ui-demo.component.css'
})
export class MaterialUiDemoComponent {
  form: FormGroup;

  user = {
    name: "Moe Min Oo",
    email: "moe@gmail.com",
    password: "P@ss1234"
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  comfirmDetails(detail: FormGroup): boolean {
    const email = this.user.email;
    const confirmEmail = detail.get('email')?.value;
    const password = this.user.password;
    const confirmPassword = detail.get('password')?.value;
    return (email === confirmEmail) && (password === confirmPassword);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      if (this.comfirmDetails(this.form)) {
        alert(`Dear ${this.user.name}. You Login Successfull.`);
      } else {
        alert("Please Try Again")
      }
    }
  }
}
