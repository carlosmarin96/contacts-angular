import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  public contactos: any[] = [];
  public contactosFiltrados: any[] = [];

  constructor(private http: HttpClient) {

  }

  obtenerContactos() {
    this.contactosFiltrados = [];
    this.http.get('http://iacenter.victortalamantes.com/users')
      .subscribe((resp: any) => {
        this.contactos = resp;
      })
  }

  agregarContacto(data: any) {
    return this.http.post<any>('http://iacenter.victortalamantes.com/user', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  actualizarContacto(data: any) {
    return this.http.put('http://iacenter.victortalamantes.com/user/', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  filtrarContactos(parametro: string) {
    this.contactosFiltrados = [];
    this.contactos.forEach((contacto: any) => {
      let nombre: string = contacto.firstName;
      let apellido: string = contacto.lastName;
      let nombreCompleto: string = nombre.toLowerCase() + ' ' + apellido.toLowerCase();
      let ubicacion: string = contacto.location;
      let telefono: string = contacto.phone;
      parametro.toLowerCase();
      if (nombreCompleto.includes(parametro) || ubicacion.includes(parametro) || telefono.includes(parametro)) {
        this.contactosFiltrados.push(contacto);
      }
    });
  }
}
