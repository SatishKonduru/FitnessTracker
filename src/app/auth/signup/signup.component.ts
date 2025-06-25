import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  today = new Date();
  maxDOB: Date = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );
  minDOB: Date = new Date(1900, 0, 1); // Jan 1, 1900
  dob: Date | null = null;

  get age(): number | null {
    if (!this.dob) return null;

    const today = new Date();
    let age = today.getFullYear() - this.dob.getFullYear();
    const m = today.getMonth() - this.dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < this.dob.getDate())) {
      age--; // birthday hasn't occurred yet this year
    }

    return age;
  }

  onSubmit = (form: NgForm) => {
    console.log('Form Data: ', form.value);
  };
}
