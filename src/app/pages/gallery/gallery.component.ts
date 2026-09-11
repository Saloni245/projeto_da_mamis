import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

export interface Product {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  categoria: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {

  produtos: Product[] = [
    {
      id: 1,
      nome: 'Amigurumi Urso Mel',
      preco: 'R$ 85,00',
      imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      categoria: 'Amigurumi',
    },
    {
      id: 2,
      nome: 'Bolsa Boho Palha',
      preco: 'R$ 130,00',
      imagem: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
      categoria: 'Bolsas',
    },
    {
      id: 3,
      nome: 'Manta Berçário Rosa',
      preco: 'R$ 220,00',
      imagem: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80',
      categoria: 'Mantas',
    },
    {
      id: 4,
      nome: 'Top Cropped Bege',
      preco: 'R$ 110,00',
      imagem: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80',
      categoria: 'Roupas',
    },
    {
      id: 5,
      nome: 'Amigurumi Coelho Branco',
      preco: 'R$ 75,00',
      imagem: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&q=80',
      categoria: 'Amigurumi',
    },
    {
      id: 6,
      nome: 'Porta-copos Mandala',
      preco: 'R$ 45,00',
      imagem: 'https://images.unsplash.com/photo-1612538498456-e861c25c3d74?w=400&q=80',
      categoria: 'Casa',
    },
    {
      id: 7,
      nome: 'Cachecol Outono',
      preco: 'R$ 90,00',
      imagem: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=400&q=80',
      categoria: 'Acessórios',
    },
    {
      id: 8,
      nome: 'Capa de Almofada Boho',
      preco: 'R$ 70,00',
      imagem: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
      categoria: 'Casa',
    },
    {
      id: 9,
      nome: 'Chapéu de Verão',
      preco: 'R$ 95,00',
      imagem: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=400&q=80',
      categoria: 'Acessórios',
    },
    {
      id: 10,
      nome: 'Amigurumi Girassol',
      preco: 'R$ 55,00',
      imagem: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
      categoria: 'Amigurumi',
    },
  ];

  getWhatsappUrl(produto: Product): string {
    const msg = `Olá! Tenho interesse na peça: ${produto.nome} (${produto.preco})`;
    return `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`;
  }
}
