import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { articleEditDalog, delDialog } from '../dialogs/dialogs.component';
import { ArticlesService,Article } from 'src/app/services/articles/articles.service';
import { Tag } from 'src/app/services/tags/tags.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {
  
  displayedColumns: string[] = ['select','title','tag','author','created', 'updated', 'option'];
  selection = new SelectionModel<Article>(true, []);
  constructor(public articleService:ArticlesService,public dialog:MatDialog,private usersService:UsersService) { }

  ngOnInit(): void {
    // console.log(this.data);
    this.getArticles()
    
  }
  getArticles():void{
    this.articleService.getArticles(this.articleService.pagination,'',this.usersService.userId).subscribe(res=>{
      console.log(res);
      
      this.articleService.articleArrs=res.body?.data
      this.articleService.pagination=res.body?.pagination
      // console.log(this.data);
      
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.articleService.articleArrs.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.articleService.articleArrs);
    // console.log(this.selection);
    
  }

  checkboxLabel(row?: Article): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  handlePageEvent(event:PageEvent):void{
    this.articleService.pagination.offset=event.pageIndex*event.pageSize
    this.articleService.pagination.pageSize=event.pageSize
    this.articleService.getArticles(this.articleService.pagination,'').subscribe(res=>{
      this.articleService.articleArrs=res.body?.data
      this.articleService.pagination=res.body?.pagination
    })
  }

  wantEdit(row:any):void{
    let title='编辑文章'
    let tags:Array<Tag>=row.tags
    console.log(tags);
    
    let tagsId:Array<number>=[]
    tags.forEach(tag=>{tagsId.push(tag.id)})
    let data={del:row.del,tags,tagsId,id:row.id,title:row.title}
    this.dialog.open(articleEditDalog,{data:{title,data},width:'40em'})
  }

  wantdelArticle(row:any):void{
    let title='删除文章'
    let delInfo='确认删除“'+row.title+'”文章？'
    this.dialog.open(delDialog,{data:{title,delInfo,ids:[row.id],item:'article'}})
  }

  wantDelArticles():void{
    let title='删除选中文章'
    let delInfo='确认删除选中的文章？'
    console.log(this.selection.selected);
    let ids:any=[]
    this.selection.selected.forEach(i=>{ids.push(i.id)})
    this.dialog.open(delDialog,{data:{title,delInfo,ids,item:'article'}})
  }
}
