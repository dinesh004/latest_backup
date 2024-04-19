import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AadhiwasiDocumentsComponent } from './aadhiwasi-documents.component';


const routes: Routes = [
  { path: '', component: AadhiwasiDocumentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AadhiwasiDocumentsRoutingModule { }
