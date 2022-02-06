import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public API_URL = 'https://api.github.com/';
  public Local_API_URL = 'http://localhost:8877/';

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();

  constructor(
    public http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  //Fetch User Detail from System
  fetchUserInfo(userName: any): Observable<any> {
    return this.http
      .get<any>(this.API_URL + 'users/' + userName, { observe: 'response' })
      .pipe(retry(1), catchError(this.handleError.bind(this)));
  }

  setData(data: any) {
    this.apiData.next(data)
  }

  //Fetch User repositories Detail from System
  fetchUserRepos(user: any, itemsPerPage: any, page: any): Observable<any> {
    return this.http
      .get(
        this.API_URL +
          'users/' +
          user +
          '/repos?per_page=' +
          itemsPerPage +
          '&page=' +
          page,
        {
          observe: 'response',
        }
      )
      .pipe(retry(1), catchError(this.handleError.bind(this)));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.snackBar.open('Invalid User! Please try valid user name', 'X');
    return throwError(errorMessage);
  }
}
