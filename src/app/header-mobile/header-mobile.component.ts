import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {

  @ViewChild('burgerContainer') burger!: ElementRef;
  @ViewChild('headerContainer') header!: ElementRef;
  menuOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

}
