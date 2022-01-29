import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  data:any=[]
  pagination:any={count:0,
    nextOffset:10,
    offset:0,
    pageSize:10,
    total:1}
  displayedColumns: string[] = ['username', 'password', 'email', 'created','updated'];
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    console.log(1111);
    
    this.getUsers()
  }

  getUsers():void{
    this.userService.getUsers(this.pagination).subscribe(res=>{
      console.log(res);
      console.log(2222);
      this.data=res.body?.data
      this.pagination=res.body?.pagination
      console.log(this.data);
    })
  }

  handlePageEvent(event:PageEvent):void{
    this.pagination.offset=event.pageIndex*event.pageSize
    this.pagination.pageSize=event.pageSize
    this.userService.getUsers(this.pagination).subscribe(res=>{
      this.data=res.body?.data
      this.pagination=res.body?.pagination
    })
  }
}
