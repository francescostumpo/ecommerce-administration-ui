import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

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
