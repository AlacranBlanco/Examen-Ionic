import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NoticeService } from '../protected/services/notice-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.page.html',
  styleUrls: ['./add-image.page.scss'],
})
export class AddImagePage implements OnInit {

  archivoFile: File;

  imageForm: FormGroup = new FormGroup({
    'archivo': new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(250),
    ]),
    'nombre': new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(250),
    ])
  })

  constructor(private noticeService: NoticeService, private router: Router) { }

  ngOnInit() {
  }

  onFileChange(e){
    const dataFile = e.target.files[0].type;
    if(dataFile === "image/jpeg" || dataFile === "image/png"){
         this.archivoFile = e.target.files[0];
         this.imageForm.controls['nombre'].setValue(this.archivoFile.name)
     } else {
          Swal.fire(
            'Error',
            'El tipo de archivo no es válido',
            'error'
          )
          this.imageForm.reset();
          return;
     }
  }

  async addImage(){
    try {
      if(this.imageForm.invalid){
        this.imageForm.markAllAsTouched();
        return;
      }
      let formData = new FormData();
      formData.append('archivo', this.archivoFile, this.archivoFile.name);
      formData.append('nombre', this.archivoFile.name);
      await this.noticeService.postImage(formData);
      this.imageForm.reset();
      Swal.fire({
        title: 'Guardado!',
        text: 'La imagen se guardó correctamente',
        icon: 'success',
        confirmButtonText: 'Save',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['home']);
        } 
      })
    } catch (error) {
      console.log(error);
    }
  
  }

}
