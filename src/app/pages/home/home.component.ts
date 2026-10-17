import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';
import { Boneca, ProductService } from '../../services/product.service';
import { ProductHighlightComponent } from '../../components/product-highlight/product-highlight.component';

export interface Testimonial {
  nome: string;
  cidade: string;
  texto: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductHighlightComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private analytics = inject(AnalyticsService);
  private productService = inject(ProductService);

  featuredProducts: Boneca[] = this.productService.getFeaturedBonecas();

  /** Boneca ativa no componente de destaque da página */
  selectedForHighlight = signal<Boneca | null>(this.featuredProducts[0] ?? null);

  /** Boneca aberta em modo modal (ao clicar em um card para ampliar fotos) */
  modalBoneca = signal<Boneca | null>(null);

  /** Controle do ângulo selecionado em cada card individual */
  cardPhotoIndex = signal<Record<string, number>>({});

  diferenciais = [
    {
      icon: '🤲',
      titulo: 'Feito à Mão',
      descricao:
        'Cada boneca e peça artesanal é modelada e costurada manualmente com riqueza de detalhes — dedicação e técnica humana em cada acabamento.',
    },
    {
      icon: '🎀',
      titulo: 'Acabamento Delicado',
      descricao:
        'Tecidos selecionados, rendas, fitas de cetim e aplicações artesanais pensadas para encantar de todos os ângulos.',
    },
    {
      icon: '✨',
      titulo: 'Designs Exclusivos',
      descricao:
        'Nossos modelos nascem no ateliê com combinações únicas de cores e estampas. Cada criação tem personalidade própria.',
    },
  ];

  testimonials: Testimonial[] = [
    {
      nome: 'Carla Mendonça',
      cidade: 'São Paulo, SP',
      texto:
        'Encomendei uma boneca para o aniversário da minha filha e ela ficou apaixonada! O capricho no vestidinho e nos sapatinhos é incrível.',
      avatar: '👩',
    },
    {
      nome: 'Renata Oliveira',
      cidade: 'Campinas, SP',
      texto:
        'Cada detalhe é perfeito, desde o laço no cabelo até o acabamento nas costas. Ficou linda na decoração do quarto. Super recomendo!',
      avatar: '👩‍🦰',
    },
    {
      nome: 'Juliana Costa',
      cidade: 'Rio de Janeiro, RJ',
      texto:
        'Atendimento maravilhoso e trabalho impecável. Dá para sentir o carinho em cada detalhe da peça. Já estou planejando minha próxima encomenda!',
      avatar: '👩‍🦳',
    },
  ];

  getCardPhotoIndex(bonecaId: string): number {
    return this.cardPhotoIndex()[bonecaId] ?? 0;
  }

  setCardPhotoIndex(bonecaId: string, index: number, event: Event): void {
    event.stopPropagation();
    this.cardPhotoIndex.update(curr => ({ ...curr, [bonecaId]: index }));
  }

  openModalHighlight(boneca: Boneca): void {
    this.modalBoneca.set(boneca);
    this.analytics.trackEvent('open_product_highlight_modal', {
      doll_id: boneca.id,
      doll_name: boneca.nome,
      source: 'home_card',
    });
  }

  closeModalHighlight(): void {
    this.modalBoneca.set(null);
  }

  getWhatsappUrl(boneca: Boneca): string {
    return this.productService.getWhatsappUrl(boneca);
  }

  onWhatsAppClick(boneca: Boneca): void {
    this.analytics.trackWhatsAppClick(boneca.nome, 'Sob consulta', boneca.tag || 'Destaque');
  }

  onGeneralWhatsAppClick(location: string): void {
    this.analytics.trackEvent('whatsapp_click', {
      button_location: location,
      timestamp: new Date().toISOString(),
    });
  }
}
