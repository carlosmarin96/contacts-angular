import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';
import { ContactModel } from './add-contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styles: [
  ]
})
export class AddContactComponent implements OnInit {

  formValue !: FormGroup;
  contactModelObj: ContactModel = new ContactModel;

  constructor(private formbuilder: FormBuilder, private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      location: ['', Validators.maxLength(90)],
      phone: ['', Validators.maxLength(10)],
      gender: ['', Validators.required],
    })
  }

  postContactDetails() {
    this.contactModelObj.firstName = this.formValue.value.firstName;
    this.contactModelObj.lastName = this.formValue.value.lastName;
    this.contactModelObj.location = this.formValue.value.location;
    this.contactModelObj.phone = this.formValue.value.phone;
    this.contactModelObj.gender = this.formValue.value.gender;

    this.contactsService.agregarContacto(this.contactModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Contact Added Successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        location.reload();
      },
        err => {
          alert("Something went wrong")
        })
  }

}
