import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {LoginPageService} from './login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginPageService]
})
export class LoginComponent implements OnInit {
  form;
  public emailId;
  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService,
    private _service:LoginPageService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  login() {
    if (this.form.valid) {
      console.log(this.form.get('password'));
      console.log(this.emailId)
      let body={
        email:this.emailId,
        password:this.form.get('password').value
      }
      this._service.getLogin(JSON.stringify(body)).subscribe(response=>{
        console.log(response);
        localStorage.setItem('token',response.token);
        localStorage.getItem('token');
        // this._service.getUserDetails('m@gmail.com').subscribe(response=>{
          // console.log("get Item Details",response);
          this.auth.sendToken(this.form.value.email)
          this.myRoute.navigate(["home"]);
        // },
        // error=>console.log(error)
        // );
      },
      error=>console.log(error)
      );
      // this.auth.sendToken(this.form.value.email)
      // this.myRoute.navigate(["home"]);
    }
  }
}
