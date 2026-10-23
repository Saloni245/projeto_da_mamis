import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Ateliê Fio & Arte — Bonecas Artesanais, Crochê e Arte em Fios' },
  { path: 'galeria', component: GalleryComponent, title: 'Catálogo de Bonecas e Peças em Crochê — Ateliê Fio & Arte' },
  { path: '**', redirectTo: '' },
];
