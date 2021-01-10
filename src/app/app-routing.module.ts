import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsEditComponent } from './products-edit/products-edit.component';

import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsTableComponent
  },  
  {
    path: "add",
    component: ProductsEditComponent
  },
  {
    path: "edit/:id",
    component: ProductsEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
