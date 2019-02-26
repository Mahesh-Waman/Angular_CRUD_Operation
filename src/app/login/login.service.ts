import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http'
import {Observable,throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private _http:HttpClient) { }

  getLogin(loginBody:String):Observable<any>{
   return this._http.post("http://localhost:5000/api/login",loginBody,this.httpOptions)
    .pipe(map((response:Response) => response),catchError(this.errorHandler));
    // .catch(this.errorHandler);
    // map((response:Response) => response.json()),

  }
  getUserDetails(userBody:string):Observable<any>{
    console.log(localStorage.getItem('token'));
    var header=new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token')
    })
    // this.httpOptions.headers.append('Authorization','Bearer '+localStorage.getItem('token'));
    console.log(this.httpOptions);
    return this._http.get("http://localhost:5000/api/getUserDetails?email="+userBody,{headers:header})
    // {headers:header}
    .pipe(map((response:Response) => response),catchError(this.errorHandler));
  }
  saveUserDetails(userBody:string):Observable<any>{
    debugger;
    return this._http.post("http://localhost:5000/api/saveUserDetails",userBody,this.httpOptions)
    .pipe(map((response:Response) => response),catchError(this.errorHandler));
  }
  updateUserDetails(userBody,emailId){
    var header=new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token')
    })
    // this.httpOptions.headers.append('Authorization','Bearer '+localStorage.getItem('token'));
    console.log(this.httpOptions);
    return this._http.put("http://localhost:5000/api/updateUserDetails?email="+emailId,userBody,{headers:header})
    // {headers:header}
    .pipe(map((response:Response) => response),catchError(this.errorHandler));
  }
  deleteUserDetails(emailId){
    var header=new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token')
    })
    // this.httpOptions.headers.append('Authorization','Bearer '+localStorage.getItem('token'));
    console.log(this.httpOptions);
    return this._http.delete("http://localhost:5000/api/deleteUserDetails?email="+emailId,{headers:header})
    // {headers:header}
    .pipe(map((response:Response) => response),catchError(this.errorHandler));
  }
errorHandler(error: HttpErrorResponse){
  debugger;
    return throwError(error);
  }

}
