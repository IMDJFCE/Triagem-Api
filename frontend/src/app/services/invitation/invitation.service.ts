import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private apiUrl = environment.bancoTalentosApi; // URL do backend

  constructor(private http: HttpClient) {}

  sendInvitation(invitationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, invitationData);
  }
}