import { Component } from '@angular/core';

// Definisikan interface untuk tipe data appPages
export interface AppPage {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Gunakan tipe AppPage[] untuk appPages
  public appPages: AppPage[] = [
    ];

  constructor() {}
}
