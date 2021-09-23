import { AddImagePage } from './add-image.page';
import { AddImagePageRoutingModule } from './add-image-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddImagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddImagePage]
})
export class AddImagePageModule {}
