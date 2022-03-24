import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from "./authentication.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AuthenticationComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    AuthenticationComponent
  ],
})
export class AutheticationModule {
}
