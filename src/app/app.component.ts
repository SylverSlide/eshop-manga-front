import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMobile: boolean;

  constructor() {
    this.isMobile = window.innerWidth < 1200; // Changer 768 par la valeur que vous considérez comme étant "mobile"
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 1200; // Changer 768 par la valeur que vous considérez comme étant "mobile"
  }
}
