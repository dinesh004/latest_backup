import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { SchemeInterface } from '../data/scheme.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbpath = '/aadhi-Cerificate'
  expensesRef!: AngularFireList<any>;
  constructor(private http: HttpClient, private db: AngularFireDatabase, private firestore: AngularFirestore) {
    this.expensesRef = db.list(this.dbpath)
  }

  getAllCerti(){
    return this.expensesRef
  }

  getCerti(key: string){
    return this.db.object(`${this.dbpath}/${key}`)
  }

  addCerti(data: SchemeInterface){
    this. expensesRef.push(data)
  }

  updateCerti(key: string, data:SchemeInterface){
    this.expensesRef.update(key, data)
  }

  deleteCerti(key: string){
    return this.expensesRef.remove(key)
  }


  // saveAadhiwasiCertificate(formData: FormData): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/aadhiwasiCertificates`, formData);
  // }

  // getDepartment1Documents(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/aadhiwasiCertificates`);
  // }


getFormData(): Observable<any[]> {
    return this.firestore.collection('applicantForms').valueChanges();
  }


}
