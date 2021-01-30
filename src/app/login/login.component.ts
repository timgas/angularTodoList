import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  submitted: boolean;

  constructor(private fb: FormBuilder, private route: Router) {
  }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // tslint:disable-next-line:typedef
   get form() {
    return this.login.controls;
  }

  onSubmit(): void {
    if (this.login.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      this.goToList();
    }
  }

  goToList(): void {
    this.route.navigate(['todo-list']);
  }

}
