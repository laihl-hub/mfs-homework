import { Component,  OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { articleEditDalog, loginDialog, loginoutDialog } from '../dialogs/dialogs.component';
import { Tag } from 'src/app/services/tags/tags.service';
import { UsersService } from 'src/app/services/users/users.service';



@Component({
  selector: 'app-head-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.css']
})
export class HeadNavComponent implements OnInit {
  loginData:any={username:'',password:''}
  constructor(public dialog:MatDialog,public usersService:UsersService) { }

  ngOnInit(): void {
    
  }

  openLoginDialog():void{
    const dialogRef=this.dialog.open(loginDialog)
  }
  loginout():void{
    this.dialog.open(loginoutDialog)
    
    // this.usersService
  }

  wantAddBlog():void{
    if(this.usersService.isLogin){
      let title='发表博客'
    let tags:Array<Tag>=[]
    let tagsId:Array<number>=[]
    let data={del:'',tags,tagsId}
    this.dialog.open(articleEditDalog,{data:{title,data},width:'40em'})
    }else{
      window.alert('请先登录噢~')
    }
    
  }

}


