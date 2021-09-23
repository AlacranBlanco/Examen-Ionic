import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Announcements } from '../protected/interfaces/Announcements';
import { NoticeService } from '../protected/services/notice-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnInit {


  objAnnouncement: Announcements;
  type: string;

  announcementForm: FormGroup = new FormGroup({
    'title': new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
    ]),
    'announcement': new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(250),
    ]),
    'userType': new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(250),
    ]),
    'imageName': new FormControl('', [
      
      Validators.minLength(2),
      Validators.maxLength(250),
    ]),
    'date': new FormControl('', [
      Validators.required,
    ]),
    'id': new FormControl('', [])
  })

  constructor(
    private activatedRoute: ActivatedRoute, 
     private noticeService: NoticeService,
     private router: Router
     ) { }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type'); 
    if(this.type === 'edit'){
      this.objAnnouncement = JSON.parse(atob(this.activatedRoute.snapshot.paramMap.get('user'))) || {};
     
      this.announcementForm.setValue({
        title: this.objAnnouncement.titulo,
        announcement: this.objAnnouncement.aviso,
        userType: this.objAnnouncement.tipoUsuario,
        imageName: this.objAnnouncement.imagen,
        date: this.objAnnouncement.fecha,
        id: this.objAnnouncement.id
      })
    }
   
  }

  async registerAnnouncement(): Promise<void> {

    try {
    
    if(this.announcementForm.invalid){
      this.announcementForm.markAllAsTouched();
      return;
    }

    let dataAnnoucement: Announcements = {
      aviso: this.announcementForm.value.announcement,
      fecha: this.announcementForm.value.date,
      imagen: this.announcementForm.value.imageName,
      tipoUsuario: this.announcementForm.value.userType,
      titulo: this.announcementForm.value.title,
    };
    
    await this.noticeService.addAnnouncement(dataAnnoucement).then(data => {
      Swal.fire({
        title: 'Resgitrado!',
        text: 'El aviso fue registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Save',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['notice-list']);
        } 
      })
    });

  } catch (error) {
      console.log(error);
  }
  }

  async update(): Promise<void> {

    try {
      if(this.announcementForm.invalid){
        this.announcementForm.markAllAsTouched();
        return;
      }
      let dataAnnoucement: any = {
        idAviso: this.announcementForm.value.id,
        aviso: this.announcementForm.value.announcement,
        fecha: this.announcementForm.value.date,
        imagen:  this.announcementForm.value.imageName,
        tipoUsuario: this.announcementForm.value.userType,
        titulo: this.announcementForm.value.title,
      };
  
      await this.noticeService.updateAnnouncement(dataAnnoucement);

      Swal.fire({
        title: 'Resgitrado!',
        text: 'El aviso fue registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Save',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['notice-list']);
        } 
      })
    } catch (error) {
      console.log(error);
    }
  }

  validateForm(input: string) {
    return this.announcementForm.controls[input].errors && this.announcementForm.controls[input].touched;
  }

}
