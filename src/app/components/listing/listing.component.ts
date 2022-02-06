import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';




@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  userData: any;
  repositories: any;
  reload: EventEmitter<boolean> = new EventEmitter();
  recordsPerPage: number = 9;
  pageSelected: number = 1;

  constructor(private dataService: HttpService,
              private router: Router) {
    dataService.apiData$.subscribe(data => this.userData = data)

  }


  getRepos(name: any, itemsPerPage: any, pageSelected: any) {
    this.dataService.fetchUserRepos(name, itemsPerPage, pageSelected).subscribe(repos => {
      this.repositories = repos.body;
    })
  }


  pageChangeHandler(event: any) {
    this.pageSelected = event;
    var windows = window;
    // when page changed to bydeafult scroll page up
    windows.scrollTo(0, 0);
    this.getRepos(this.userData.login, this.recordsPerPage, this.pageSelected);
  }

  ngOnInit(): void {
    if ( this.userData == null){
      this.router.navigate(['']);
    }else{
      this.getRepos(this.userData.login, this.recordsPerPage, this.pageSelected);
    }
  }



}
