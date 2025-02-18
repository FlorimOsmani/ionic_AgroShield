import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Schadeclaim } from './schadeclaim';
import { Status } from './status';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SchadeclaimService {
  //uri: string = "http://34.195.35.188:8000/";
  uri: string = "https://agroshield.be:8000/";

  constructor(private httpClient: HttpClient) { }

  async getSchadeclaimByEmailCAP(email: string): Promise<Observable<Schadeclaim[]>> {
    const url = `${this.uri}schadeclaims/email/${email}`;

    const options = {
      url: url,
      params: { email: email }
    }

    const response = await CapacitorHttp.get(options);

    return of(response.data as Schadeclaim[]);
  }

  async getSchadeclaimByPerceelIdCAP(id: number): Promise<Observable<Schadeclaim>> {
    const url = `${this.uri}schadeclaims/perceel/${id}`;

    const options = {
      url: url,
      params: { id: id.toString() }
    }

    const response = await CapacitorHttp.get(options);

    return of(response.data as Schadeclaim);
  }
}