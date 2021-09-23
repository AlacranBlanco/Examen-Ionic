import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  navigation = [
    {title: 'Lista de avisos', to: '/notice-list'},
    {title: 'Agregar imagen', to: '/add-image'}
  ];

  constructor() {
    
  }

}
