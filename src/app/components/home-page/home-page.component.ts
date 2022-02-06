import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router,
              private httpSvc: HttpService,
              private cdRef: ChangeDetectorRef) { }

  name = new FormControl('');


  ngOnInit() { }

  // function to get user profile data
  getUserData() {
    this.httpSvc.fetchUserInfo(this.name.value).subscribe((res) => {
      this.httpSvc.setData(res.body)
      this.router.navigate(['/list']);

    });
  }
}
