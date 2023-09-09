import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isMobile: boolean;
  showAdminHeader: boolean = false;

  constructor(
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.isMobile = window.innerWidth < 1200;
  }
  ngOnInit(): void {
    this.headerService.showAdminHeader$.subscribe((showHeader) => {
      this.showAdminHeader = showHeader;

      this.cdr.detectChanges();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 1200;
  }
}
