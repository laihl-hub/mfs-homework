import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { articlesConfig } from 'src/assets/articlesConfig';
import { Pagination } from 'src/assets/pagination';
import { Tag } from '../tags/tags.service';

export interface Article{
  id:number,
  title:string,
  tags:Array<Tag>,
  userId:number,
  createdAt:Date,
  updatedAt:Date,
  intro:string,
  del:string,
  user:any,
  viewTimes:number
}
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  options:any={observe:'response',responseType:'json',withCredentials:true}
  pagination:any={count:0,
    nextOffset:10,
    offset:0,
    pageSize:10,
    total:1}
    articleArrs:Array<Article>=[]

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

  getArticles(pagination:Pagination,filter:any,userId:number=1){
    let {offset,pageSize}=pagination
    let{name='',value=''}=filter
    let url='http://localhost:3000/api/'
    if(name.indexOf('Tag')!=-1){
      url=url+'tags/'+value+'/article'
    }else if(name.indexOf('Kind')!=-1){
      console.log(value);
      
      value = new Date(value);
      console.log(value);
      
      // console.log(kind.getDay();
      // console.log(kind.getFullYear());
      let str1 =
        value.getFullYear() + "-" + (value.getMonth() + 1) + "-01 08:00:00";
      console.log(str1);
      let next = new Date(value.setMonth(value.getMonth() + 1));
      let str2 =
        next.getFullYear() + "-" + (next.getMonth() + 1) + "-01 08:00:00";
      console.log(str2);
      // console.log(next);
      // console.log(kind);
      filter = [str1, str2];
      url =
      url+'article?offset='+offset +"&pageSize=" +pageSize +"&filter=" +
      JSON.stringify(filter);
    }else{
      console.log(userId);
      
      if(userId==1||userId==2){
        url=url+'article?offset='+offset+'&pageSize='+pageSize
      }else{
        url=url+'article?offset='+offset+'&pageSize='+pageSize+'&userId='+userId
      }
      
    }
    // {observe:'response',responseType:'json'}
    return this.http.get<articlesConfig>(url, {observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError));
  }

  getLatestArticles(){
    return this.http.get<articlesConfig>('http://localhost:3000/api/latest-article',{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }

  getKinds(){
    return this.http.get<articlesConfig>('http://localhost:3000/api/kinds',{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }
 
  getArticleById(id:number){
    return this.http.get<articlesConfig>('http://localhost:3000/api/article/'+id,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }
  edit(article:any){
    let id=article.id
    let intro=article.del.slice(0,50)
    let info={title:article.title,tag:article.tagsId,intro,del:article.del}
    return this.http.put<articlesConfig>('http://localhost:3000/api/article/'+id,info,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }
  add(article:any){
    let intro=article.del.slice(0,50)
    let info={title:article.title,tag:article.tagsId,intro,del:article.del}
    return this.http.post<articlesConfig>('http://localhost:3000/api/article',info,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }
  delArticles(ids:any=[]){
    let url='http://localhost:3000/api/article?ids='+JSON.stringify(ids)
   
    console.log(ids);
    
    return this.http.delete<articlesConfig>(url,{observe:'response',responseType:'json',withCredentials:true}).pipe(catchError(this.handleError))
  }
}
