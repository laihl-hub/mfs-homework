import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { articlesConfig } from 'src/assets/articlesConfig';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  options:any={observe:'response',responseType:'json',withCredentials:true}

  url:string='http://localhost:3000/api/'
  isLogin:boolean=false
  userId:any=1
  username:string=''

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('An error occurred:',error.error);
      
      window.alert('出错啦，请稍后再试！')
    }else{
      console.error(`Backend returned code ${error.status} body was:`,error.error);
      
      window.alert('服务器端出错啦，请稍后再试！')
    }
    return throwError('Something bad happened;please try again later')
  }

  constructor(private http:HttpClient) { }

  getUsers(pagination:any){
    let {offset,pageSize}=pagination
    let url=this.url+'users?offset='+offset+'&pageSize='+pageSize
    
    return this.http.get<articlesConfig>(url,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError));
  }

  loginState(){
    let url=this.url+'session'
    return this.http.get<articlesConfig>(url,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }

  login(userInfo:any){
    // let {username,password}=userInfo
    let url=this.url+'session/login'
    return this.http.post<articlesConfig>(url,userInfo,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }

  loginout(){
    let url=this.url+'session'
    return this.http.delete<articlesConfig>(url,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }

  regist(userInfo:any){
    let url=this.url+'users/regist'
    return this.http.post<articlesConfig>(url,userInfo,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }
}
