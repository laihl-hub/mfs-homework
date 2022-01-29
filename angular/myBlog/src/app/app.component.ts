import { Component, Inject,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticlesService } from './services/articles/articles.service';
import { TagsService,Tag } from './services/tags/tags.service';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myBlog';
  constructor(private usersService:UsersService){}
  ngOnInit(): void {
    this.usersService.loginState().subscribe(res=>{
      console.log(res);
      if(res.body?.data.username){
        console.log('登陆了');
        
        this.usersService.isLogin=true
        this.usersService.userId=res.body.data.id
        this.usersService.username=res.body.data.username
      }else{
        console.log('没登录');
        
        this.usersService.isLogin=false
      }
    })
  }
}

// @Component({selector:'article-edit-dialog',templateUrl:'./components/tools/articleEditDialog.html'})
// export class articleEditDalog implements OnInit{
//   tags:Array<Tag>=[]
//   all:Array<Tag>=[]
//   tagsId:Array<number>=[]
//   constructor(public articleEditDialogRef:MatDialogRef<articleEditDalog>,@Inject(MAT_DIALOG_DATA) public data:any,public tagService:TagsService,private articleService:ArticlesService){}
//   ngOnInit(): void {
//     this.tags=this.data.data.tags
//     this.tagsId=this.data.data.tagsId
//     this.tagService.getTags().subscribe(res=>{console.log(res);
//       this.all=res.body?.data
//     })
//   }
//   addSel(tag:any):void{
//     if(!this.tagsId.includes(tag.id)){
//       this.tags.push(tag)
//     this.tagsId.push(tag.id)
//     }
    
//     console.log(this.tags);
    
//   }
//   confirm():void{
//     let id=this.data.data.id
//     // console.log();
//     if(id){
//       this.articleService.edit(this.data.data).subscribe(res=>{console.log(res);
        
//           Object.assign(this.articleService.articleArrs.filter(i=>i.id===res.body?.data.id)[0],res.body?.data)
        
//           console.log(6666);
//       })
//     }else{
//       this.articleService.add(this.data.data).subscribe(res=>{console.log(res);
//         if(this.articleService.articleArrs.length<this.articleService.pagination.pageSize){
//           console.log(4444);
//           this.articleService.articleArrs=[...this.articleService.articleArrs,res.body?.data]
//           this.articleService.pagination.count++
//         }
//         this.articleService.pagination.total++
//       })
//     }
//     this.articleEditDialogRef.close()
    
//   }
//   cancel():void{
//     this.articleEditDialogRef.close()
//   }

//   remove(tag:any){
    
//   }
// }
// @Component({selector:'tag-edit-dialog',templateUrl:'./components/tools/tagEditDialog.html'})
// export class tagEditDalog{
//   constructor(public tagEditDialogRef:MatDialogRef<tagEditDalog>,@Inject(MAT_DIALOG_DATA) public data:any,private tagsService:TagsService){}
//   confirm():void{
//     // console.log();
//     let id=this.data.data.id
//     this.tagsService.editTag(this.data.data).subscribe(res=>{
//       console.log(res);
//       if(id!=0){
//         Object.assign(this.tagsService.tagArrs.filter(i=>i.id===res.body?.data.id)[0],res.body?.data)
//       }else{
//         console.log(6666);
        
//         if(this.tagsService.tagArrs.length<this.data.pagination.pageSize){
//           console.log(5555);
          
//           this.tagsService.tagArrs=[...this.tagsService.tagArrs,res.body?.data]
//           this.tagsService.pagination.total++
//           this.tagsService.pagination.count++
//           console.log(this.tagsService.tagArrs);
//         }
//       }
      
      
//     })
//     this.tagEditDialogRef.close()
//   }
//   cancel():void{
//     this.tagEditDialogRef.close()
//   }
// }

// @Component({selector:'del-dialog',templateUrl:'./components/tools/delDialog.html'})
// export class delDialog{
//   constructor(public delDialogRef:MatDialogRef<delDialog>,@Inject(MAT_DIALOG_DATA) public data:any,private tagService:TagsService,private articleService:ArticlesService) {

//    }
//   confirm():void{
//     if(this.data.item=='tag'){
//       this.tagService.delTags(this.data.ids).subscribe(res=>{console.log(res);
//         console.log(res.body?.data);
//         this.tagService.tagArrs=this.tagService.tagArrs.filter(item=>{
//           if(res.body?.data.includes(item.id)){
//             console.log('you');
//             return
//           }else{
//             console.log('meiyou');
//             return item
            
//           }
//         })
//         // })
//         console.log(this.tagService.tagArrs);
//       })
//     }else if(this.data.item='article'){
//       console.log('我要删文章');
//       this.articleService.delArticles(this.data.ids).subscribe(res=>{console.log(res);
//         console.log(res.body?.data);
//         this.articleService.articleArrs=this.articleService.articleArrs.filter(item=>{
//           if(res.body?.data.includes(item.id)){
//             console.log('you');
//             return
//           }else{
//             console.log('meiyou');
//             return item
            
//           }
//         })
//         // })
//         console.log(this.articleService.articleArrs);
//       })
      
//     }else{}
    
    
//     // console.log(33333);
    
//     this.delDialogRef.close()
//   }
//   cancel(){
//     this.delDialogRef.close()
//   }
// }

// @Component({selector:'login-dialog',templateUrl:'./components/tools/loginDialog.html'})
// export class loginDialog{
//   constructor(public loginDialogRef:MatDialogRef<loginDialog>,private usersService:UsersService,public dialog:MatDialog){}
//   loginData:any={username:'',password:''}

//   confirm():void{
//     console.log(33333);
//     this.usersService.login(this.loginData).subscribe(res=>{console.log(res);
//       window.localStorage.setItem('userId',res.body?.data.id)
//       this.usersService.isLogin=true
//       this.usersService.userId=res.body?.data.id
//       this.usersService.username=res.body?.data.username
//     })
    
//     this.loginDialogRef.close()
//   }
//   cancel(){
//     this.loginDialogRef.close()
//   }
//   regist(){
//     this.loginDialogRef.close()
//     this.dialog.open(registDialog)
//   }}

// @Component({selector:'regist-dialog',templateUrl:'./components/tools/registDialog.html'})
// export class registDialog{
//   constructor(public registDialogRef:MatDialogRef<registDialog>,private usersService:UsersService,public dialog:MatDialog){}
//   registData:any={username:'',password:'',email:''}
//   repsd:string=''

//   confirm():void{
//     console.log(33333);
//     // this.usersService.login(this.registData).subscribe(res=>{console.log(res);
//     //   window.localStorage.setItem('userId',res.data.id)
//     // })
//     this.usersService.regist(this.registData).subscribe(res=>{console.log(res);
//     })
//     this.registDialogRef.close()
//     this.dialog.open(loginDialog)
//   }
//   cancel(){
//     this.registDialogRef.close()
//   }
// }

// @Component({selector:'loginout-dialog',templateUrl:'./components/tools/loginoutDialog.html'})
// export class loginoutDialog{
//   constructor(public loginoutDialogRef:MatDialogRef<loginoutDialog>,private usersService:UsersService,private router: Router) { }

//   confirm():void{
//     console.log(33333);
//     this.usersService.loginout().subscribe(res=>{console.log(res);
//       window.localStorage.removeItem('userId')
//       this.router.navigate(['/'])
//       this.usersService.isLogin=false
//       this.usersService.userId=1
//       this.usersService.username=''
//     })
    
//     this.loginoutDialogRef.close()
//   }
//   cancel(){
//     this.loginoutDialogRef.close()
//   }
// }


