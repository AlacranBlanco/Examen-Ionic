import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { UserFormPage } from './user-form.page';
import { UserFormPageRoutingModule } from './user-form-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserFormPage]
})
export class UserFormPageModule {}
