import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, from, map, of } from 'rxjs';
import { Perceel } from './perceel';
import { soortGewas } from "./soortGewas";
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class PerceelService {
  //uri: string = "http://192.168.158.115:8000/";
  uri: string = "https://3.210.11.226:8000/";

  // Counter state management
  private perceelCount = new BehaviorSubject<number>(0); // Initial count
  perceelCount$ = this.perceelCount.asObservable(); // Observable for other components

  //constructor(private httpClient: HttpClient) { }
  constructor() { }

  getPercelen(): Observable<Perceel[]> {
    //return this.httpClient.get<Perceel[]>(this.uri + "perceel");
    const dummyPercelen: Observable<Perceel[]> = of([]); // Define dummyPercelen as an empty array of Perceel
    return dummyPercelen;
  }

  // getPercelenByEmail(email: string): Observable<Perceel[]> {
  //   const url = this.uri + `perceel/email/${email}`;
  //   return this.httpClient.get<Perceel[]>(url);
  // }

  getPercelenByEmailHTTPS(email: string): Observable<Perceel[]> {
    const fullUrl = this.uri + 'perceel/email/' + email;
    console.log("Fetching from URL:", fullUrl); // ✅ Debug URL

    const options = {
      url: fullUrl,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    return from(Http.request(options)).pipe(
      map((response: any) => {
        console.log("Received response:", response); // ✅ Debug Response
        return response.data as Perceel[];
      })
    );
  }

  getPercelenByToegevoegdePersonen(toegevoegdePersonen: string): Observable<Perceel[]> {
    //return this.httpClient.get<Perceel[]>(this.uri + "perceel/toegevoegdePersonen/" + toegevoegdePersonen);
    const dummyPercelen: Observable<Perceel[]> = of([]); // Define dummyPercelen as an empty array of Perceel
    return dummyPercelen;
  }
}