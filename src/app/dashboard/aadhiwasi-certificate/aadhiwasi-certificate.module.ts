import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AadhiwasiCertificateRoutingModule } from './aadhiwasi-certificate-routing.module';
import { DataService } from '../../service/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AadhiwasiCertificateRoutingModule

  ],
  providers: [AngularFireStorage],
})
export class AadhiwasiCertificateModule { }

