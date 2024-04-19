import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard2',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard2.component.html',
  styleUrl: './dashboard2.component.css'
})
export class Dashboard2Component {
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
