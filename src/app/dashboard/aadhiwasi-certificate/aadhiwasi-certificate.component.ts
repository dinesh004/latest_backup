import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-aadhiwasi-certificate',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './aadhiwasi-certificate.component.html',
  styleUrl: './aadhiwasi-certificate.component.css'
})
export class AadhiwasiCertificateComponent implements OnInit{
  uploadPercentages: any[] = [];
  applicantForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private storage: AngularFireStorage,
    private firestore: AngularFirestore, private authService: AuthService, private afAuth: AngularFireAuth, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.applicantForm = this.formBuilder.group({
      salutation1: ['', Validators.required],
      fullname: ['', Validators.required],
      namemarathi: ['', Validators.required],
      salutation2: ['', Validators.required],
      fathername: ['', Validators.required],
      fathernamemarathi: ['', Validators.required],
      salutation3: ['', Validators.required],
      mothername: ['', Validators.required],
      mothernamemarathi: ['', Validators.required],
      birthdate: ['', Validators.required],
      age: ['', Validators.required],
      mobile: ['', Validators.required],
      aadhar: ['', Validators.required],
      bankname: ['', Validators.required],
      accountno: ['', Validators.required],
      ifccode: ['', Validators.required],
      branch: ['', Validators.required],
      document1: [''],
      document2: ['']
    });
  }

  onSubmit(): void {
    if (this.applicantForm.valid) {
      const formData = this.applicantForm.value;
      const userId = this.authService.getCurrentUserId();

      // Upload documents and save form data
      this.uploadAndSave(formData, userId);
      this.toastr.success('Form submitted successfully!');

    } else {
      // Handle invalid form
      this.toastr.error('Something Went Wrong!');
    }
  }

  private uploadAndSave(formData: any, userId: string | null): void {
    if (!userId) {
      console.error('User ID not available.');
      return;
    }

    const document1Input = <HTMLInputElement>document.getElementById('document1');
    const document2Input = <HTMLInputElement>document.getElementById('document2');

    const document1 = document1Input.files ? document1Input.files[0] : null;
    const document2 = document2Input.files ? document2Input.files[0] : null;

    if (!document1 || !document2) {
      console.error('Document files not found.');
      return;
    }

    const filePath1 = `aadi-info/${document1.name}`;
    const filePath2 = `aadi-info/${document2.name}`;

    const task1 = this.uploadFile(filePath1, document1);
    const task2 = this.uploadFile(filePath2, document2);

    Promise.all([task1, task2]).then(() => {
      formData.userId = userId;

      this.firestore.collection('aadi-info').add(formData)
        .then(() => {
          console.log('Form data saved successfully.');
          // Optionally, navigate to a success page or show a success message
        })
        .catch(error => {
          console.error('Error saving form data: ', error);
          // Handle the error, show an error message, or retry the operation
        });
    }).catch(error => {
      console.error('Error uploading documents: ', error);
      // Handle the error, show an error message, or retry the operation
    });
  }

  private uploadFile(filePath: string, file: File): Promise<void> {
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Promise<void>((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            // Ensure to pass formData and userId to saveDocumentUrl()
            const formData = this.applicantForm.value; // Assuming this is your form data
            const userId = this.authService.getCurrentUserId(); // Get current user ID
            this.saveDocumentUrl(downloadURL, formData, userId);
            console.log('File available at: ', downloadURL);
            resolve();
          });
        })
      ).subscribe(null, error => {
        console.error('Error uploading file: ', error);
        reject(error);
      });
    });
  }




  private saveDocumentUrl(downloadURL: string, formData: any, userId: string | null): void {
    if (!userId) {
      console.error('User ID not available.');
      return;
    }

    // Query Firestore to find the document to update
    this.firestore.collection('aadi-info', ref => ref.where('userId', '==', userId))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (!querySnapshot) {
          console.error('Query snapshot is undefined.');
          return;
        }

        if (querySnapshot.empty) {
          console.error('No document found for the user.');
          return;
        }

        querySnapshot.forEach(doc => {
          // Check which document URL to update based on the form data
          if (formData.document1 && formData.document1 !== '') {
            // Update document1URL
            doc.ref.update({
              document1URL: downloadURL,
              // You can add more fields here if needed
            }).then(() => {
              console.log('Document 1 URL updated successfully.');
              // Optionally, navigate to a success page or show a success message
            }).catch(error => {
              console.error('Error updating document 1 URL: ', error);
              // Handle the error, show an error message, or retry the operation
            });
          }

          if (formData.document2 && formData.document2 !== '') {
            // Update document2URL
            doc.ref.update({
              document2URL: downloadURL,
              // You can add more fields here if needed
            }).then(() => {
              console.log('Document 2 URL updated successfully.');
              // Optionally, navigate to a success page or show a success message
            }).catch(error => {
              console.error('Error updating document 2 URL: ', error);
              // Handle the error, show an error message, or retry the operation
            });
          }
        });
      })
      .catch(error => {
        console.error('Error querying Firestore: ', error);
        // Handle the error, show an error message, or retry the operation
      });
  }

}
