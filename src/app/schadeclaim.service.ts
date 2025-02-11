import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schadeclaim } from './schadeclaim';
import { Status } from './status';

@Injectable({
  providedIn: 'root',
})
export class SchadeclaimService {
  uri: string = "http://192.168.158.115:8000/";

  constructor(private httpClient: HttpClient) { }

  getSchadeclaims(): Observable<Schadeclaim[]> {
    return this.httpClient.get<Schadeclaim[]>(this.uri + 'schadeclaims');
  }

  getSchadeclaimById(id: number): Observable<Schadeclaim> {
    return this.httpClient.get<Schadeclaim>(this.uri + 'schadeclaims/' + id);
  }

  getSchadeclaimByStatus(status: Status): Observable<Schadeclaim> {
    return this.httpClient.get<Schadeclaim>(
      this.uri + 'schadeclaims/status/' + status
    );
  }

  getSchadeclaimByEmail(email: string): Observable<Schadeclaim[]> {
    return this.httpClient.get<Schadeclaim[]>(this.uri + "schadeclaims/email/" + email);
  }

  getSchadeclaimByPerceelId(id: number): Observable<Schadeclaim> {
    return this.httpClient.get<Schadeclaim>(
      this.uri + 'schadeclaims/perceel/' + id
    );
  }

  getBewijsmateriaalBySchadeclaimId(id: string): Observable<any> {
    return this.httpClient.get<any>(this.uri + 'schadeclaims/bewijsmateriaal/' + id);
  }

  putSchadeclaim(
    id: string,
    schadeclaim: Schadeclaim,
    statusName: string
  ): Observable<Schadeclaim> {
    return this.httpClient.put<Schadeclaim>(
      this.uri + 'schadelclaims/' + id,
      schadeclaim
    );
  }

  postSchadeclaim(schadeclaim: Schadeclaim): Observable<{ status_code: number; id: string }> {
    return this.httpClient.post<{ status_code: number; id: string }>(
      this.uri + 'schadeclaims/create',
      schadeclaim
    );
  }

  verstuurSchadeclaim(payload: { gemeente: string; startdatum: string, einddatum: string, gebruikerEmail: string, perceelId: number, coordinates: number[][][] }): Observable<any> {
    return this.httpClient.post(this.uri + 'schadeclaims/bewijsmateriaal', payload);
  }

  deleteSchadeclaim(id: string): Observable<Schadeclaim> {
    return this.httpClient.delete<Schadeclaim>(
      this.uri + 'schadeclaims/delete/' + id
    );
  }
}