import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AadhiwasiCertificateComponent } from './aadhiwasi-certificate.component';


const routes: Routes = [
  { path: '', component: AadhiwasiCertificateComponent },
  // { path: 'aadhiwasi-document', component: AadhiwasiDocumentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AadhiwasiCertificateRoutingModule { }
