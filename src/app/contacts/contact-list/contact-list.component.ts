import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModel } from './contact-list.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styles: [
  ]
})
export class ContactListComponent implements OnInit {

  formValueUpdate !: FormGroup;
  contactModelObj: ContactModel = new ContactModel;
  @ViewChild("filtro") filtro!: ElementRef;

  get contactos() {
    if (this.contactsService.contactosFiltrados.length === 0) {
      return this.contactsService.contactos;
    } else {
      return this.contactsService.contactosFiltrados;
    }

  }

  constructor(private contactsService: ContactsService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactsService.obtenerContactos();
    this.formValueUpdate = this.formbuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      location: ['', Validators.maxLength(90)],
      phone: ['', Validators.maxLength(10)],
      gender: ['', Validators.required],
    })
  }

  onEdit(contacto: any) {
    this.contactModelObj.id = contacto.id;
    console.log(contacto.id)
    this.formValueUpdate.controls['firstName'].setValue(contacto.firstName);
    this.formValueUpdate.controls['lastName'].setValue(contacto.lastName);
    this.formValueUpdate.controls['location'].setValue(contacto.location);
    this.formValueUpdate.controls['phone'].setValue(contacto.phone);
    this.formValueUpdate.controls['gender'].setValue(contacto.gender);
  }

  updateContactDetails() {
    this.contactModelObj.firstName = this.formValueUpdate.value.firstName;
    this.contactModelObj.lastName = this.formValueUpdate.value.lastName;
    this.contactModelObj.location = this.formValueUpdate.value.location;
    this.contactModelObj.phone = this.formValueUpdate.value.phone;
    this.contactModelObj.gender = this.formValueUpdate.value.gender;
    this.contactsService.actualizarContacto(this.contactModelObj)
      .subscribe(res => {
        alert('User updates');
        let ref = document.getElementById('cancelU');
        ref?.click();
        this.formValueUpdate.reset();
        location.reload();
      })
  }

  obtainAllContacts() {
    this.contactsService.obtenerContactos();
  }

  getFilter() {
    let filtro = this.filtro.nativeElement.value;
    if (filtro !== '') {
      this.contactsService.filtrarContactos(filtro);
    }
  }

}
