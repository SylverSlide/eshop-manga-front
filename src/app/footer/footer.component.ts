import { Component, OnInit } from '@angular/core';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  constructor() {}

  ngOnInit(): void {}
}
