import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPropertyComponent } from './component/list-property/list-property.component';
import { AddPropertyComponent } from './component/add-property/add-property.component';
import { ViewPropertyComponent } from './component/view-property/view-property.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list_property',
    pathMatch: 'full'
  },
  {
    path: 'list_property',
    component: ListPropertyComponent,
    pathMatch: 'full'
  },
  {
    path: 'add_property',
    component: AddPropertyComponent,
    pathMatch: 'full'
  },
  {
    path: 'view_property/:id',
    component: ViewPropertyComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
