import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  goToView(location: string): void {
    this.router.navigate(['aragonMultiservice/' + location]);
  }
}
