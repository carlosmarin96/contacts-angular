import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactsModule } from './contacts/contacts.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ContactsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
