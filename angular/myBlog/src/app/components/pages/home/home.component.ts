import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { TagsService } from 'src/app/services/tags/tags.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles:any=[]
  latestArticles:any=[]
  kinds:any=[]
  tags:any=[]
  pagination:any={count:0,
    nextOffset:10,
    offset:0,
    pageSize:10,
    total:1}
  filter:any={}
  url:string=''
  param:any=''
  selectedArticle:any={title:'',tags:[],createdAt:'',viewTimes:0,del:''}
  // routerChange:any

  constructor(private articlesService:ArticlesService,private tagsService:TagsService,private route:ActivatedRoute,private router:Router) { 
    
  }

  ngOnInit(): void {
    // console.log(this.route);
    
    this.route.url.subscribe(url=>{
      this.articles=[]
    // console.log(this.url);
    // console.log(1111);
    
    if(url.length===0){
      this.url='',
      this.param=0
    }else{
      this.url=url[0].path
      this.param=url[1].path
      // console.log(2222);
    }
    this.getArticles()
    })
    this.getTags()
    this.getLatestArticles()
    this.getKinds()
  }

  getArticles():void{
    if(this.url==='articleDel'){
      // console.log(11111);
      
      this.articlesService.getArticleById(this.param).subscribe(res=>{
        console.log(res.body);
        
        console.log(res.body?.data);
        
        this.selectedArticle=res.body?.data
      })
    }else{
      let filter={name:this.url,value:this.param}
      this.articlesService.getArticles(this.pagination,filter).subscribe((res)=>{console.log(res.body)
        this.articles=[...this.articles,...res.body?.data]
        this.pagination=res.body?.pagination
        this.pagination.offset=this.pagination.nextOffset
        console.log(this.pagination);
      })
    }
    
   
  }

  getLatestArticles():void{
    this.articlesService.getLatestArticles().subscribe(res=>{console.log(res.body?.data);
      this.latestArticles=res.body?.data
    })
  }

  getKinds():void{
    this.articlesService.getKinds().subscribe(res=>{console.log(res.body?.data);
      this.kinds=res.body?.data
    })
  }

  getTags():void{
    this.tagsService.getTags().subscribe(res=>{console.log(res.body?.data);
    
      this.tags=res.body?.data
    // this.tagsService.all=res.body?.data
  })
  }
  loadMore():void{
    console.log(11111);
    if(this.pagination.offset==null){

    }else{
      this.getArticles()
    }
  }
  

}
