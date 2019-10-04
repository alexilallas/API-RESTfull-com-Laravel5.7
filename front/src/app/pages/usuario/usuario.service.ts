import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from './usuario';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../services/messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  static usuarioCreatedAlert;
  static usuarioUpdatedAlert;
  private usuarioUrl: string;

  constructor
    (
      private http: HttpClient,
      private MessageService: MessageService,
  ) {
    console.log('UsuarioService')
    this.usuarioUrl = environment.baseAPI + 'usuario'
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuarioUrl)
      .pipe(map((response: any) => response.data));

  }

  getUsuarioById(id): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuarioUrl + '/' + id)
      .pipe(map((response: any) => response.data.usuario[0]));

  }

  postUsuario(usuario: Usuario) {
    UsuarioService.usuarioCreatedAlert = new EventEmitter<any>()
    return this.http.post<any>(
      this.usuarioUrl,
      usuario)
      .subscribe(
        (response) => {
          this.MessageService.message(response)
          if (response.status == 200) {
            UsuarioService.usuarioCreatedAlert.emit(response)
          }
        }
      )
  }

  updateUsuario(usuario: Usuario) {
    UsuarioService.usuarioUpdatedAlert = new EventEmitter<any>()
    return this.http.put<any>(
      this.usuarioUrl,
      usuario)
      .subscribe(
        (response) => {
          this.MessageService.message(response)
          if (response.status == 200) {
            UsuarioService.usuarioUpdatedAlert.emit(response)
          }
        }
      )
  }

}