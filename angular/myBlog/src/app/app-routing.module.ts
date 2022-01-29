import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { YourGuardGuard } from './your-guard.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'byKind/:kind',component:HomeComponent},
  {path:'byTag/:tagId',component:HomeComponent},
  {path:'articleDel/:id',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'admin',component:AdminComponent,canActivate:[YourGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
