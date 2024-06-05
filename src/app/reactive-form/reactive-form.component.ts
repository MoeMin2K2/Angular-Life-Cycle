import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})

export class ReactiveFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isValid: boolean = false;
  tax: number = 0;

  eduOptions = [
    {value:"BEHS"},
    {value:"BEMS"},
    {value:"BEPS"},
    {value:"UNI"},
  ]; 

  constructor(private formBilder: FormBuilder) {
    console.log ("constructor is called");
  }
 
  ngOnInit(): void {
    this.registrationForm = this.formBilder.group({
      name: ['', [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s]*$/)]], // minlength="3" pattern="^[a-zA-Z\s]*$"
      email: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]], //,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]// pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      compass: ['', [Validators.required, Validators.minLength(6)]], 
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.maxLength(11),Validators.minLength(10)]], // pattern="^[0-9]*$" maxlength="11" minlength="10"
      salary: ['',Validators.required],
      tax: [''],
      dob: ['', Validators.required],
      age: [''],
      edu: ['', Validators.required],
      address : this.formBilder.group({
        street: ['',Validators.required] ,
        city: ['',Validators.required] ,
        state: ['',Validators.required] ,
        zip: ['',[Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
      })
    },{validators :  this.confirmPasswords.bind(this)});
  }

  dob: any;
  age: number = 0;

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
      this.registrationForm.patchValue({age : this.age});
    }

  calculateTax(): void {
    const salary = this.registrationForm.get('salary')?.value;
       this.tax = salary ? salary * 0.05 : 0;
       this.registrationForm.patchValue({ tax: this.tax });
  }

  confirmPasswords(confirm: AbstractControl) : ValidationErrors | null {
    console.log("Type",confirm);
      const password =  confirm.get('password')?.value;
      const confirmPassword = confirm.get('compass')?.value;
      return password !== confirmPassword? {notMatchPassword : true} : null;
  }

  isInvalid(field: string): boolean {
    const validation = this.registrationForm.get(field);
    if(validation && validation.invalid && (validation.dirty || validation.touched)){
      return !this.isValid;
     } else 
     return this.isValid;
  }

  invalidMessage(field: string): string {
    console.log("Field: ",field);
    const validation = this.registrationForm.get(field); 
    if (validation && validation.errors) {
      if (validation.errors['required']) {
        return `*This field is required`;
      } else if (validation.errors['minlength']) {
        const minLength = validation.errors['minlength'].requiredLength;
        return `*Minimum length is ${minLength} characters`;
      } else if (validation.errors['maxlength']) {
        const maxlength = validation.errors['maxlength'].requiredLength;
        return `*Maximum length is ${maxlength} characters`;
       } else if (validation.errors['pattern']) {
        switch(field){
              case "name": return `*Enter a valid ${field}.(eg. John Doe)`;
              case "email": return `*Enter a valid ${field}.(eg. john@gmail.com)`;
              case "phone": return `*Enter a valid ${field} number.(eg. 09123431234)`;
              case "password": return `*Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.(eg. @pp!3S)`;
              case "address.zip": return `*Enter a valid zip code (4 digits).`;
              default: return '';
        }
      } 
    }
    return '';
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log("Form Data: ",this.registrationForm.value);
      this.registrationForm.reset();
      this.age = 0;
    } else {
      console.log("Form is not valid");
    }
  }

}
