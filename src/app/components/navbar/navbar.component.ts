import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  isNotPortal() {
    const location = window.location.pathname;
    if (location === '/aragonMultiservice') {
      return false;
    }
    return true;
  }
}
