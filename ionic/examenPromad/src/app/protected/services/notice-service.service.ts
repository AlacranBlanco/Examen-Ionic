import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Announcements } from '../interfaces/Announcements';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class NoticeService {


  private _baseUrl: string = environment.baseUrl;

  constructor(private _httClient: HttpClient) { }


  getAnnouncements(){
    return new Promise<Announcements[]>((resolve, reject) => {
      this._httClient.get<Announcements[]>(`${this._baseUrl}/avisos`)
      .subscribe((res) => resolve(res), (error) => {
        reject(error);
      });

    });
  }

  getImages(){
    return new Promise<any>((resolve, reject) => {
      this._httClient.get<any>(`${this._baseUrl}IMG`)
      .subscribe((res) => resolve(res), (error) => {
        reject(error);
      });
    });
  }


   postImage(imageData){
    return new Promise((resolve, reject) => {
      this._httClient.post(`${this._baseUrl}medios`,  imageData)
      .subscribe((res) => resolve(''), (error) => {
        reject(error);
      })
    })
  }

  addAnnouncement(announcementdata: Announcements) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return new Promise((resolve, reject) => {
      this._httClient.post(`${this._baseUrl}nuevoAviso`, announcementdata, httpOptions)
        .subscribe(() => resolve('Added'), (error) => {
          reject(error);
        });
    });
  }

  updateAnnouncement(announcementdata: Announcements) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'responseType': 'text' })
    }
    return new Promise((resolve, reject) => {
      this._httClient.put(`${this._baseUrl}actualizaAvisos/`, announcementdata, httpOptions)
        .subscribe(() => resolve('Updated'), (error) => {
          reject(error);
        });
    });
  }

  deleteAnnouncement(idAnnouncement: any) {
    return new Promise((resolve, reject) => {
      this._httClient.delete(`${this._baseUrl}eliminaAviso/` + idAnnouncement)
        .subscribe(() => resolve('Delete Succesful'), (error) => {
          reject(error);
        });
    });
  }

  

  
}
