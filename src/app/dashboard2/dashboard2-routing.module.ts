import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard2Component } from './dashboard2.component';


const routes: Routes = [
  {
    path: '',
    component: Dashboard2Component,
     children: [
      {
        path: 'department1-doc', loadChildren: () => import('./department1-documents/department1-documents.module').then(m => m.Department1DocumentsModule)
      }
     ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard2RoutingModule { }
