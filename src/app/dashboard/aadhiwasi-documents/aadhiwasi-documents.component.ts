import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-aadhiwasi-documents',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './aadhiwasi-documents.component.html',
  styleUrl: './aadhiwasi-documents.component.css'
})
export class AadhiwasiDocumentsComponent {

}
