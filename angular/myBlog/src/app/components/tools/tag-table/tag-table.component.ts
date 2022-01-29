import { SelectionModel } from '@angular/cdk/collections';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit, Input  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import { delDialog, tagEditDalog } from '../dialogs/dialogs.component';
import { TagsService,Tag } from 'src/app/services/tags/tags.service';




@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.css']
})
export class TagTableComponent implements OnInit {
  
  displayedColumns: string[] = ['select','name', 'description', 'created', 'updated','option']
  selection = new SelectionModel<Tag>(true, []);
  constructor(public tagService:TagsService,public dialog:MatDialog) {
    
   }

  ngOnInit(): void {
    this.getTags()
  }

  getTags():void{
    this.tagService.getTags(this.tagService.pagination).subscribe(res=>{
      this.tagService.tagArrs=res.body?.data
      this.tagService.pagination=res.body?.pagination
      console.log(this.tagService.tagArrs);
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tagService.tagArrs.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.tagService.tagArrs);
    // console.log(this.selection);
    
  }

  checkboxLabel(row?: Tag): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  handlePageEvent(event:PageEvent):void{
    this.tagService.pagination.offset=event.pageIndex*event.pageSize
    this.tagService.pagination.pageSize=event.pageSize
    this.tagService.getTags(this.tagService.pagination).subscribe(res=>{
      this.tagService.tagArrs=res.body?.data
      this.tagService.pagination=res.body?.pagination
    })
  }
  wantEdit(row:any):void{
    let title='编辑标签'
    let data={id:row.id,name:row.name,description:row.description}
    
    this.dialog.open(tagEditDalog,{data:{title,data}})
  }
  wantdelTag(row:any):void{
    console.log(row);
    let title='删除标签'
    let delInfo='确认删除“'+row.name+'”标签？'
    this.dialog.open(delDialog,{data:{title,delInfo,ids:[row.id],item:'tag'}})
  }
  wantDelTags():void{
    let title='删除选中标签'
    let delInfo='确认删除选中的标签？'
    console.log(this.selection.selected);
    let ids:any=[]
    this.selection.selected.forEach(i=>{ids.push(i.id)})
    this.dialog.open(delDialog,{data:{title,delInfo,ids,item:'tag'}})
  }
  wantAdd():void{
    let title='添加标签'
    let data={id:0,name:'',description:''}
    this.dialog.open(tagEditDalog,{data:{title,data,pagination:this.tagService.pagination}})
  }
}
