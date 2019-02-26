import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {LoginPageService} from '../login/login.service'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form;
  public action;
  readName
      readEmailid
      readuName
      readContactNumber
      readPassword
      readConfirmPassword
      password
      checked = false;
      title;
  constructor(private fb: FormBuilder, private myRoute: Router,private _service:LoginPageService,private activatedRoute:ActivatedRoute) { 
    this.form = fb.group({
      email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required,Validators.minLength(5)]],
      name:['', [Validators.required]],
      uName:['', [Validators.required]],
      MobNo:['', [Validators.required,Validators.minLength(10)]],
      CPassword:['', [Validators.required,Validators.minLength(5)]],
      
    }
    );
    this.activatedRoute.url.subscribe(url =>{
      console.log("url change");
      console.log(url);
    this.action=this.activatedRoute.snapshot.params['action'];
      this.actionMethod();
 });
    console.log(this.action);
  }

  ngOnInit() {
    console.log(this.action);
    
  }
public emailId;
  actionMethod(){
    if(this.action == 'update'){
      this.readName=false;
      this.readEmailid=false
      this.readuName=false
      this.readContactNumber=false;
      this.readPassword=false;
      this.readConfirmPassword=false;
      this.title="Update Information";
      this._service.getUserDetails(localStorage.getItem("LoggedInUser")).subscribe(response =>{
          console.log("get response");
          console.log(response);
      this.form.get('name').setValue(response.name);
      this.form.get('email').setValue(response.email);
      this.form.get('uName').setValue(response.userName);
      this.form.get('MobNo').setValue(response.mobileNo);
        this.emailId=response.email;
        this.password=response.password;
        console.log(this.password);
      },
      error=>{
        console.log(error);

      })
      // this.form.setValue({name:"Mahesh dummy name"})

    }
    else if(this.action=='delete'){
      this.readName=true;
      this.readEmailid=true;
      this.readuName=true;
      this.readContactNumber=true;
      this.readPassword=true;
      this.readConfirmPassword=true;
      this.title="Delete Account";
      this._service.getUserDetails(localStorage.getItem("LoggedInUser")).subscribe(response =>{
        console.log("get response");
        console.log(response);
    this.form.get('name').setValue(response.name);
    this.form.get('email').setValue(response.email);
    this.form.get('uName').setValue(response.userName);
    this.form.get('MobNo').setValue(response.mobileNo);
    this.emailId=response.email;
    },
    error=>{
      console.log(error);

    })
    }
    else{
      this.show=true;
      this.title="New Registration"
    }
  }

  submit(){
    if(this.action=="update"){
      if(this.checked==true){
        if(this.form.get('password').value==''){
          alert("Please Enter password and Confirm Password")
        }
        else if(this.form.get('password').value != this.form.get('CPassword').value){
          alert("please enter valid password")
        }
        else{
          var saveUser={
            "name": this.form.get('name').value,
            "email": this.form.get('email').value,
            "userName": this.form.get('uName').value,
            "password": this.form.get('password').value ==''?this.password:this.form.get('password').value ==null?this.password:this.form.get('password').value,
            "mobileNo": this.form.get('MobNo').value
          }
          this._service.updateUserDetails(JSON.stringify(saveUser),this.emailId).subscribe(response=>{
            console.log("update calling");
            console.log(response);

            alert(response.message)
            this.myRoute.navigate(["home"])
            // var a=response.message
          },
          error=>{
            console.log(error)
          });
        }
      }
      else {
        console.log(this.form.get('password').value);
        var saveUser={
          "name": this.form.get('name').value,
          "email": this.form.get('email').value,
          "userName": this.form.get('uName').value,
          "password": this.form.get('password').value ==''?this.password:this.form.get('password').value ==null?this.password:this.form.get('password').value,
          "mobileNo": this.form.get('MobNo').value
        }
        this._service.updateUserDetails(JSON.stringify(saveUser),this.emailId).subscribe(response=>{
          console.log("update calling");
          console.log(response)
          alert(response.message);
          this.myRoute.navigate(["home"])
          
        },
        error=>{
          console.log(error)
        });
      }
      
    }
    else if(this.action=="delete"){
      
      this._service.deleteUserDetails(this.emailId).subscribe(response=>{
        console.log("Delete calling");
        console.log(response);
        alert(response.message)
        this.myRoute.navigate(["home"])
      },
      error=>{
        console.log(error)
      });
    }
    else {
      if(this.form.get('password').value==''){
        alert("Please Enter password and Confirm Password")
      }
      else if(this.form.get('password').value != this.form.get('CPassword').value){
        alert("please enter valid password")
      }
      else{
        var saveUser={
          "name": this.form.get('name').value,
          "email": this.form.get('email').value,
          "userName": this.form.get('uName').value,
          "password": this.form.get('password').value,
          "mobileNo": this.form.get('MobNo').value
        }
        this._service.saveUserDetails(JSON.stringify(saveUser)).subscribe(response=>{
          console.log(response)
          alert(response.message)
          this.myRoute.navigate(["home"])
        },
        error=>{
          console.log(error)
        });
      }
      
    }
   
  }
  public show=false;
  checkclick(){
    console.log(this.checked);
    if(this.checked==false){
      this.show=true;
      this.checked=true;
    }
    else if(this.checked == true){
      this.show=false;
      this.checked=false;
    }
  }

}
