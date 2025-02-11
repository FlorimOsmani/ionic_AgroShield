import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Perceel } from './perceel';
import { soortGewas } from "./soortGewas";
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PerceelService {
  //uri: string = "http://localhost:8000/";
  uri: string = "http://192.168.158.115:8000/";

  // Counter state management
  private perceelCount = new BehaviorSubject<number>(0); // Initial count
  perceelCount$ = this.perceelCount.asObservable(); // Observable for other components

  constructor(private httpClient: HttpClient) { }

  // Method to update the perceel count manually
  updatePerceelCount(count: number): void {
    this.perceelCount.next(count); // Update the BehaviorSubject
  }

  getPercelen(): Observable<Perceel[]> {
    return this.httpClient.get<Perceel[]>(this.uri + "perceel");
  }

  // Fetch all percelen and update the count
  getPercelenByEmailCount(email: string): Observable<number> {
    const perceelList$ = this.httpClient.get<Perceel[]>(this.uri + "perceel/email/" + email);
    perceelList$.subscribe((percelen) => {
      this.updatePerceelCount(percelen.length); // Update the counter when fetching data
    });
    return this.perceelCount$;
  }

  getPerceelById(id: number): Observable<Perceel> {
    return this.httpClient.get<Perceel>(this.uri + "perceel/" + id);
  }

  // getPercelenByEmail(email: string): Observable<Perceel[]> {
  //   return this.httpClient.get<Perceel[]>(this.uri + "perceel/email/" + email);
  // }

  getPercelenByEmail(email: string): Observable<Perceel[]> {
    const url = this.uri + `perceel/email/${email}`;
    return this.httpClient.get<Perceel[]>(url);  // Direct use of HttpClient, returns an Observable
  }

  getPercelenByGewas(gewasNaam: soortGewas): Observable<Perceel[]> {
    return this.httpClient.get<Perceel[]>(this.uri + "perceel/gewas/" + gewasNaam);
  }

  putPerceel(id: string, perceel: Perceel, gewas_name: string): Observable<Perceel> {
    return this.httpClient.put<Perceel>(this.uri + "perceel/" + id + "/" + gewas_name, perceel);
  }

  postPerceel(perceel: Perceel, email: string, gewas_name: string): Observable<Perceel> {
    return this.httpClient.post<Perceel>(this.uri + "perceel/create/" + email + "/" + gewas_name, perceel).pipe(
      // Automatically refresh the count after a perceel is added
      tap(() => this.refreshPerceelCount(email))
    );
  }

  deletePerceel(id: string, email: string): Observable<Perceel> {
    return this.httpClient.delete<Perceel>(this.uri + "perceel/delete/" + id).pipe(
      // Automatically refresh the count after a perceel is deleted
      tap(() => this.refreshPerceelCount(email))
    );
  }

  permDeletePerceel(id: string): Observable<Perceel> {
    return this.httpClient.delete<Perceel>(this.uri + "perceel/delete/permanently/" + id)
  }

  refreshPerceelCount(email: string): void {
    this.getPercelenByEmailCount(email).subscribe(); // Re-fetch the list to update the count
  }

  getPercelenByGemeente(gemeente: String): Observable<Perceel[]> {
    return this.httpClient.get<Perceel[]>(
      this.uri + 'perceel/gemeente/' + gemeente
    );
  }

  getWeatherData(gemeente: string): Observable<any> {
    return this.httpClient.get<any>(
      this.uri + 'perceel/weatherdata/' + gemeente
    );
  }

  getPercelenByToegevoegdePersonen(toegevoegdePersonen: string): Observable<Perceel[]> {
    return this.httpClient.get<Perceel[]>(this.uri + "perceel/toegevoegdePersonen/" + toegevoegdePersonen);
  }
}