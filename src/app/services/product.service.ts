import { Injectable } from '@angular/core';
import bonecasData from '../data/bonecas.json';

export interface FotoBoneca {
  angulo: 'Frente' | 'Perfil' | 'Costas' | string;
  legenda: string;
  url: string;
  driveId?: string;
  driveUrl?: string;
}

export interface Boneca {
  id: string;
  nome: string;
  subtitulo: string;
  categoria: string;
  tag: string;
  destaque: boolean;
  disponibilidade: string;
  descricao: string;
  detalhes: string[];
  imagemCapa: string;
  fotos: FotoBoneca[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly whatsappPhone = '5511974169141';
  private readonly bonecas: Boneca[] = bonecasData as Boneca[];

  /**
   * Retorna todas as bonecas cadastradas no JSON estático.
   */
  getAllBonecas(): Boneca[] {
    return this.bonecas;
  }

  /**
   * Retorna as bonecas marcadas como destaque.
   */
  getFeaturedBonecas(): Boneca[] {
    return this.bonecas.filter(b => b.destaque);
  }

  /**
   * Busca uma boneca específica pelo ID.
   */
  getBonecaById(id: string): Boneca | undefined {
    return this.bonecas.find(b => b.id === id);
  }

  /**
   * Gera a URL do WhatsApp com mensagem personalizada para a peça selecionada.
   */
  getWhatsappUrl(boneca: Boneca, angulo?: string): string {
    const detalheAngulo = angulo ? ` (vi as fotos de ${angulo.toLowerCase()} no site)` : '';
    const msg = `Olá! Vi a peça "${boneca.nome}"${detalheAngulo} no site do Ateliê Fio & Arte e gostaria de saber mais informações sobre encomenda e disponibilidade.`;
    return `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(msg)}`;
  }
}

