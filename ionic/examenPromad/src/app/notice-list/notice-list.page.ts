import { Component, OnInit } from '@angular/core';

import { Announcements } from '../protected/interfaces/Announcements';
import { HttpClient } from '@angular/common/http';
import { NoticeService } from '../protected/services/notice-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.page.html',
  styleUrls: ['./notice-list.page.scss'],
})
export class NoticeListPage implements OnInit {

  annoucemments: Announcements[] = [];

  constructor(
    
    private noticeService: NoticeService
  ) {
   
   }

  ngOnInit(): void {
    this.getAnnouncements();
  }


  editAnnouncement(annoucemment: Announcements){
    return `/user-form/${btoa(JSON.stringify(annoucemment))}/edit`;
  }

  newAnnouncement(){
    return `/user-form/register`;
  }

  getAnnouncements() {
      this.noticeService.getAnnouncements().then((ann) =>{ 
        this.annoucemments = ann ;
     });
    
  }

  deleteAnnouncement(idAnnouncement: any){
    this.noticeService.deleteAnnouncement(idAnnouncement).then(data => {
      this.getAnnouncements();
      Swal.fire({
        title: 'Eliminado !',
        text: 'El aviso fue eliminado correctamente',
        icon: 'success',
        confirmButtonText: 'Save',
      })
     
    });
  }


  ngOndestroy() {
    this.annoucemments = [];
    window.location.reload();
  }
  

}
