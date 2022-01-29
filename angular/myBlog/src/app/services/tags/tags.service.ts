import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { articlesConfig } from 'src/assets/articlesConfig';
import { Pagination } from 'src/assets/pagination';
import { catchError, throwError } from 'rxjs';

export interface Tag{
  id:number,
  name:string,
  description:string,
  createdAt:Date,
  updatedAt:Date
}
@Injectable({
  providedIn: 'root'
})
export class TagsService {
  options:any={observe:'response',responseType:'json',withCredentials:true}
  url:string='http://localhost:3000/api/tags'
  tagArrs:Array<Tag>=[]
  pagination:any={count:0,
    nextOffset:10,
    offset:0,
    pageSize:10,
    total:1}
    all:Array<Tag>=[]

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
  getTags(pagination:any=null){
    let url=this.url
    if(pagination!=null){
      let {offset,pageSize}=pagination
      url=url+'?offset='+offset+'&pageSize='+pageSize
    }else{
      
    }
    return this.http.get<articlesConfig>(url,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError));
  }

  editTag(tagInfo:any){
    let url=this.url
    if(tagInfo.id!=0){
      url=url+'/'+tagInfo.id
      return this.http.put<articlesConfig>(url,tagInfo,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
    }else{
      let {name,description}=tagInfo
      return this.http.post<articlesConfig>(url,{name,description},{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
    }
  }

  delTags(ids:any=[]){
    let url=this.url+'?ids='+JSON.stringify(ids)
    console.log(ids);
    
    return this.http.delete<articlesConfig>(url,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }
}
