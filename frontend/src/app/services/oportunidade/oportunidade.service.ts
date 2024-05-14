import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OportunidadeRequest } from 'src/app/models/OportunidadeRequest';
import { OportunidadeResponse } from 'src/app/models/OportunidadeResponse';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OportunidadeService {
  private baseURL: string = "";

  constructor(private http:HttpClient) {
    this.baseURL = environment.bancoTalentosApi;
   }

   getAllOportunidades(): Observable<OportunidadeResponse[]> {
    return this.http.get<OportunidadeResponse[]>(`${this.baseURL}/oportunidades/`, {
      headers: this.getHeaders()
    });
   }

   getOportunidadeById(id: string): Observable<OportunidadeResponse> {
    return this.http.get<OportunidadeResponse>(`${this.baseURL}/oportunidades/${id}`, {
      headers: this.getHeaders()
    });
   }

   createOportunidade(oportunidade: OportunidadeRequest): Observable<OportunidadeResponse> {
    return this.http.post<OportunidadeResponse>(`${this.baseURL}/oportunidades/`, oportunidade, {
      headers: this.getHeaders()
    });
   }

   updateOportunidade(id: string, oportunidade: OportunidadeRequest): Observable<OportunidadeResponse> {
    return this.http.put<OportunidadeResponse>(`${this.baseURL}/oportunidades/${id}`, oportunidade, {
      headers: this.getHeaders()
    });
   }

   deleteOportunidade(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/oportunidades/${id}`, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }
}