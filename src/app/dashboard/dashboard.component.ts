import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { user } from '@angular/fire/auth';
import { UserInterFace } from '../data/user.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  currentUser: UserInterFace | null = null;
authaService = inject(AuthService)
router = inject(Router)
ngOnInit(): void {
  this.authaService.user$.subscribe((user) => {
    if (user) {
      const userObject: UserInterFace = {
        email: user.email ?? '',
        fullName: user.displayName ?? '',
        password: '', // Add default values for other properties
        aadharCardNo: '',
        mobileNo: '',
        birthdate: '',
        profilePic: ''
      };
      this.currentUser = userObject;
      this.authaService.currentUserSig.set(userObject);
    } else {
      this.authaService.currentUserSig.set(null);
    }
    console.log(this.authaService.currentUserSig());
  });
}

logout(): void {
  this.authaService.logout().subscribe({
    next: () => {
      // Redirect to login page after successful logout
      this.router.navigateByUrl('');
      console.log('User logged out');

    },
    error: (err) => {
      console.error('Logout error:', err);
      // Handle logout error if needed
    }
  });
}
marathiContent = [
  { label: 'आदीवासी प्रमाणपत्र', route: 'aadhiwasi-documents' },
  { label: 'बिरसा मुंडा सिंचन विहीर योजना', route: 'birsa-munda-sinchana-vihira-yojana' },
  { label: 'शेळी पालन योजना', route: 'sheli-palan-yojana' },
  { label: 'दालमिल उपकरण संच मळणी यंत्र योजना', route: 'dalmil-upakaran-sanch-madhani-yantra-yojana' },
  { label: 'शासकीय वस्ती ग्रह योजना', route: 'shasakhiya-vasti-grah-yojana' },
  { label: 'अनुसूचित जमातीच्या मुला-मुलींसाठी प्रदेशात शिक्षणासाठी शिष्यवृत्तीयोजना', route: 'anusuchit-jamati-mula-mulinsathi-pradesh-shikshan-sath-shishyavruttiv-yojana' },
  { label: 'गाय/म्हशी वाटप योजना', route: 'gay-mhasi-vatap-yojana' },
  { label: 'सुशिक्षित बेरोजगार भांडवल योजना', route: 'sushikshit-berojgar-bhandaval-yojana' },
  { label: 'रहिवाशी प्रमाणपत्र', route: 'rahivashi-pramanpatra' },
  { label: 'विडिओ व फोटो शुटिंग कॅमेरा योजना', route: 'video-photo-shooting-camera-yojana' },
  { label: 'तळपात्री योजना', route: 'talapatri-yojana' },
  { label: 'शिलाई मशीन योजना', route: 'shilai-machine-yojana' },
  { label: 'मिरची कांडप योजना', route: 'mirchi-kandap-yojana' },
  { label: 'कुकुट पालन योजना (बचत गटासाठी)', route: 'kukut-palan-yojana' },
  { label: 'सबलीकरण योजना', route: 'sablikaran-yojana' },
  { label: 'कोळपणी यंत्र वाटप योजना', route: 'kolpani-yantra-vatap-yojana' },
];




  toggleLanguage() {
    // Change the language of the whole page to English
    document.documentElement.lang = 'en';
  }
  adjustFontSize(action: string = '') {
    const currentFontSize = parseInt(getComputedStyle(document.body).fontSize);
    let newFontSize: number;

    switch(action) {
      case '-':
        newFontSize = currentFontSize - 2;
        break;
      case '+':
        newFontSize = currentFontSize + 2;
        break;
      default:
        newFontSize = 18; // Default font size
        break;
    }

    document.body.style.fontSize = newFontSize + 'px';
  }
}
