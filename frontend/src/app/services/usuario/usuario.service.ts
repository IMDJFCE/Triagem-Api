import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRequest } from 'src/app/models/UsuarioRequest';
import { UsuarioResponse } from 'src/app/models/UsuarioResponse';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = "";

  constructor(private http: HttpClient) {
    this.url = environment.bancoTalentosApi;
  }

  getAllUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.url}/usuarios/`, {
      headers: this.getHeaders()
    });
  }

  getUsuarioById(id: string): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.url}/usuarios/${id}`, {
      headers: this.getHeaders()
    });
  }

  createUsuario(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.url}/usuarios/`, usuario, {
      headers: this.getHeaders()
    });
  }

  updateUsuario(id: string, usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.url}/usuarios/${id}`, usuario, {
      headers: this.getHeaders()
    });
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/usuarios/${id}`, {
      headers: this.getHeaders()
    });
  }

  verificarPermissao(): Observable<boolean> {
    const usuarioId = localStorage.getItem('usuarioId');
    const permissao = 'Recrutador';
    return this.http.get<boolean>(`${this.url}/usuarios/verificar-permissao/${usuarioId}/${permissao}`, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Ou sessionStorage.getItem('token')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }
}
