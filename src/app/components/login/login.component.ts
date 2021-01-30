import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  goToApp(): void {
    this.router.navigate(['homepage'], {relativeTo: this.route});
  }
}
