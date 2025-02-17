import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, from, map, of, catchError } from 'rxjs';
import { Perceel } from './perceel';
import { soortGewas } from "./soortGewas";
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PerceelService {
  uri: string = "http://34.195.35.188:8000/";

  constructor() { }

  async getPercelenCAP(): Promise<Observable<Perceel[]>> {
    const url = `${this.uri}perceel`;

    const options = {
      url: url,
    }

    const response = await CapacitorHttp.get(options);

    return of(response.data as Perceel[]);
  }

  async getPercelenByEmailCAP(email: string): Promise<Observable<Perceel[]>> {
    const url = `${this.uri}perceel/email/${email}`;

    const options = {
      url: url,
      params: { email: email }
    }

    const response = await CapacitorHttp.get(options);

    return of(response.data as Perceel[]);
  }

  // getPercelenByToegevoegdePersonen(toegevoegdePersonen: string): Observable<Perceel[]> {
  //   return this.httpClient.get<Perceel[]>(this.uri + "perceel/toegevoegdePersonen/" + toegevoegdePersonen);
  // }

  async getPercelenByToegevoegdePersonenCAP(toegevoegdePersonen: string): Promise<Observable<Perceel[]>> {
    const url = `${this.uri}perceel/toegevoegdePersonen/${toegevoegdePersonen}`;

    const options = {
      url: url,
      params: { toegevoegdePersonen: toegevoegdePersonen }
    }

    const response = await CapacitorHttp.get(options);

    return of(response.data as Perceel[]);
  }
}