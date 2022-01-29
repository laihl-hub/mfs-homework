import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { HeadNavComponent} from './components/tools/head-nav/head-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { UserTableComponent } from './components/tools/user-table/user-table.component';
import { ArticleTableComponent } from './components/tools/article-table/article-table.component';
import { TagTableComponent } from './components/tools/tag-table/tag-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
// import {infiniteScroll} from 'ng-infinite-scroll'
// import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { DialogsComponent } from './components/tools/dialogs/dialogs.component';
import { tagEditDalog,articleEditDalog,delDialog ,loginDialog,loginoutDialog,registDialog } from './components/tools/dialogs/dialogs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AdminComponent,
    HeadNavComponent,
    UserTableComponent,
    ArticleTableComponent,
    TagTableComponent,
    loginDialog,
    registDialog,
    delDialog,
    tagEditDalog,articleEditDalog,
    loginoutDialog,
    DialogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    // infiniteScroll
    InfiniteScrollModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatChipsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
