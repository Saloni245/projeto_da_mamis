import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';

export interface Product {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  tag?: string;
}

export interface Testimonial {
  nome: string;
  cidade: string;
  texto: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private analytics = inject(AnalyticsService);

  diferenciais = [
    {
      icon: '🤲',
      titulo: 'Feito à Mão',
      descricao: 'Cada peça é tecida com agulhas e fios naturais. Nenhum tear, nenhuma máquina — apenas dedicação e técnica humana.',
    },
    {
      icon: '🌿',
      titulo: 'Material Sustentável',
      descricao: 'Priorizamos fios de algodão orgânico, lã de ovinos criados em liberdade e corantes naturais sem químicos nocivos.',
    },
    {
      icon: '✨',
      titulo: 'Designs Exclusivos',
      descricao: 'Nossos modelos nascem de esboços próprios. Cada peça é um original — você não encontrará igual em nenhuma loja.',
    },
  ];

  featuredProducts: Product[] = [
    {
      id: 1,
      nome: 'Amigurumi Urso Mel',
      preco: 'R$ 85,00',
      imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      tag: 'Mais vendido',
    },
    {
      id: 2,
      nome: 'Bolsa Boho Palha',
      preco: 'R$ 130,00',
      imagem: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
      tag: 'Novo',
    },
    {
      id: 3,
      nome: 'Manta Berçário Rosa',
      preco: 'R$ 220,00',
      imagem: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80',
      tag: 'Exclusivo',
    },
  ];

  testimonials: Testimonial[] = [
    {
      nome: 'Carla Mendonça',
      cidade: 'São Paulo, SP',
      texto: 'Encomendei um amigurumi para o aniversário da minha filha e ela ficou apaixonada! A qualidade é incrível e chegou embalado com tanto carinho.',
      avatar: '👩',
    },
    {
      nome: 'Renata Oliveira',
      cidade: 'Campinas, SP',
      texto: 'A manta que comprei é uma obra de arte. Cada detalhe é perfeito, a textura é deliciosa e combinei com toda a decoração do quarto. Super recomendo!',
      avatar: '👩‍🦰',
    },
    {
      nome: 'Juliana Costa',
      cidade: 'Rio de Janeiro, RJ',
      texto: 'Atendimento maravilhoso e produto ainda melhor. A bolsa boho é exatamente o que eu queria para o verão. Já estou planejando minha próxima encomenda!',
      avatar: '👩‍🦳',
    },
  ];

  getWhatsappUrl(produto: string): string {
    return `https://wa.me/5511974169141?text=Olá!%20Tenho%20interesse%20na%20peça%3A%20${encodeURIComponent(produto)}`;
  }

  onWhatsAppClick(produto: Product): void {
    this.analytics.trackWhatsAppClick(produto.nome, produto.preco, produto.tag || 'Destaque');
  }

  onGeneralWhatsAppClick(location: string): void {
    this.analytics.trackEvent('whatsapp_click', {
      button_location: location,
      timestamp: new Date().toISOString(),
    });
  }
}
