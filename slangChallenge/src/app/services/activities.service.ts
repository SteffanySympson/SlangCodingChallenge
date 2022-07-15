import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { Activities } from "../models/activities";

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {

  //api rest to Slang
  url = 'https://api.slangapp.com/challenges/v1/activities'

  // injecting the HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic MTA4OkVXSHlQMUt1UmhhVXlOMEVUYUd2Z1p4RUI4dDVvVHMvT3U5MVhTbE12a0k9'
    })
  }

  getList() : Observable<Activities[]> {
    return this.httpClient.get<Activities[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Get an activity by id
  getActivitieById(id: number): Observable<Activities> {
    return this.httpClient.get<Activities>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   // sava the activitie
   saveActivitie(activities: Activities): Observable<Activities> {
    return this.httpClient.post<Activities>(this.url, JSON.stringify(activities), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   // update an activity
   updateCar(activities: Activities): Observable<Activities> {
    return this.httpClient.put<Activities>(this.url + '/' + activities.id, JSON.stringify(activities), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // delete  an activity
  deleteCar(activities: Activities) {
    return this.httpClient.delete<Activities>(this.url + '/' + activities.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error occurred on client side
      errorMessage = error.error.message;
    } else {
      // Error occurred on server side
      errorMessage = `Error code: ${error.status}, ` + `menssage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
