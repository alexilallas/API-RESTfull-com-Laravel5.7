import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Paciente } from './paciente';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../services/messages/message.service';
// import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  static pacienteCriado = new EventEmitter<any>();
  private pacientesUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor
    (
    private http: HttpClient,
    private MessageService:MessageService,
    ) {
    console.log('PacienteService')
    this.pacientesUrl = environment.baseAPI + 'paciente'
  }

  getPacientes (): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.pacientesUrl)
    .pipe(map((response: any) => response['data']['pacientes']));

  }

  postPaciente (paciente: Paciente){
    return this.http.post(
      this.pacientesUrl,
      paciente,this.httpOptions)
      .subscribe(
        (data) => {
          console.log(data)
          this.MessageService.message(data)
          if(data['status'] == 200)
          PacienteService.pacienteCriado.emit(data)
        }
        )
  }

}
