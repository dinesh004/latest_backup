import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { SchemeInterface } from '../data/scheme.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }









  getAllDocuments(collectionPath: string): Observable<SchemeInterface[]> {
    return this.firestore.collection<SchemeInterface>(collectionPath).valueChanges();
  }

  getDocumentById(collectionPath: string, documentId: string): Observable<SchemeInterface | undefined> {
    return this.firestore.collection<SchemeInterface>(collectionPath).doc(documentId).valueChanges();
  }


  getAllImages(folderPath: string): Observable<string[]> {
    const ref = this.storage.ref(folderPath);
    return ref.listAll().pipe(
      map(result => {
        return result.items.map(item => {
          return item.getDownloadURL();
        });
      }),
      switchMap(promises => {
        return Promise.all(promises);
      })
    );
  }
}
