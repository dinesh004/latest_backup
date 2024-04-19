import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Department1DocumentsComponent } from './department1-documents.component';

const routes: Routes = [
  {
    path: '',
    component: Department1DocumentsComponent
  }
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Department1DocumentsRoutingModule { }
