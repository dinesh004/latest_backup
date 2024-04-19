import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchemeInterface } from '../../data/scheme.interface';
import jsPDF from 'jspdf';
import { Observable, map } from 'rxjs';
import { FirestoreService } from '../../service/firestoreService.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

declare var $: any; // Declare jQuery



@Component({
  selector: 'app-department1-documents',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule, NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './department1-documents.component.html',
  styleUrl: './department1-documents.component.css'
})
export class Department1DocumentsComponent implements OnInit {
  department1Documents: SchemeInterface[] = [];
  selectedData: any = {};
  documents$!: Observable<SchemeInterface[]>;
  documentUrls: Map<string, string> = new Map();
  imageNames$: Observable<string[]> | undefined;
  constructor(private dataService: DataService, private firestoreService: FirestoreService, private storage: AngularFireStorage) {


   }

  ngOnInit(): void {
    // this.getDocuments();
    this.loadData()
    this.imageNames$ = this.getImageNames();



  }

  getImageNames(): Observable<string[]> {
    // Replace 'aadi-info' with your actual storage folder name
    const storageRef = this.storage.ref('aadi-info');
    return storageRef.listAll().pipe(
      map(result => result.items.map(item => item.name))
    );
  }

  getImageUrl(imageName: string): string {
    // Construct the URL dynamically
    return `https://firebasestorage.googleapis.com/v0/b/government-project-99fa3.appspot.com/o/aadi-info%2F${imageName}?alt=media`;
  }



  loadData(): void {
    console.log("Loading data...");
    this.firestoreService.getAllDocuments('aadi-info').subscribe(data => {
      this.department1Documents = data;
      data.forEach(document => {
        if (document.key) {
          console.log('Key:', document.key);
        }
        console.log('Documents:', data);
      });
    });
  }





  // getDocuments() {
  //   this.dataService.getDepartment1Documents()
  //     .subscribe(data => {
  //       this.department1Documents = data;
  //     });
  // }

  getDocuments() {
    this.dataService.getAllCerti().snapshotChanges()
      .subscribe(data => {
        this.department1Documents = [];
        data.forEach(item => {
          let scheme: SchemeInterface = item.payload.val();
          scheme.key = item.key!;
          this.department1Documents.push(scheme);
          console.log(data);

        });
      });
  }

  openModal(data: any): void {
    this.selectedData = data;
    // Trigger modal to open here
  }
  print() {
    window.print();
  }


  openInNewTab(url: string) {
    const width = 500; // Specify your desired width
    const height = 400; // Specify your desired height
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const options = `width=${width},height=${height},top=${top},left=${left}`;
    window.open(url, '_blank', options);
  }




  generateCertificate() {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });



    // Add header with today's date
    const today = new Date();
    const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    doc.setFontSize(12);
    doc.text(`Date: ${dateString}`, 10, 10);

    // Add content to the PDF
    doc.setFontSize(24);
    doc.text('Cast Certificate', 105, 60, { align: 'center' });

    // Additional content
    doc.setFontSize(12);
    doc.text('This is to certify that', 105, 80, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.text(this.selectedData.fullname, 105, 90, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.text('belongs to the', 105, 100, { align: 'center' });

    doc.text('cast.', 105, 120, { align: 'center' });

    // Signature line
    doc.setFontSize(12);
    doc.text('_________________________', 105, 160, { align: 'center' });
    doc.text('Authorized Signature', 105, 170, { align: 'center' });

    // Save the PDF
    doc.save('Cast_Certificate.pdf');
}




}

