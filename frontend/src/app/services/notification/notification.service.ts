import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = environment.bancoTalentosApi; // URL do endpoint de notificações

  constructor(private http: HttpClient) {}

  createNotification(notificationData: { userId: number, message: string, opportunityId: string | null }): Observable<any> {
    return this.http.post(this.apiUrl, notificationData);
  }
}
