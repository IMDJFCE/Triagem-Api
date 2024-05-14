import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioResponse } from 'src/app/models/UsuarioResponse';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TriagemService {
  private baseURL: string = "";

  constructor(private http: HttpClient){
    this.baseURL = environment.bancoTalentosApi;
   }

   triarUsuariosParaOportunidade(idOportunidade: string): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.baseURL}/triagens/${idOportunidade}`, {
      headers: this.getHeaders()
    })
   }

   private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }
}
