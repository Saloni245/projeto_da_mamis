import { Component, inject, signal } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { Boneca, ProductService } from '../../services/product.service';
import { ProductHighlightComponent } from '../../components/product-highlight/product-highlight.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ProductHighlightComponent],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  private analytics = inject(AnalyticsService);
  private productService = inject(ProductService);

  produtos: Boneca[] = this.productService.getAllBonecas();

  /** Boneca ativa no destaque do topo da galeria */
  highlightedBoneca = signal<Boneca | null>(this.produtos[0] ?? null);

  /** Boneca aberta em modo modal (ao clicar em ampliar/destaque) */
  modalBoneca = signal<Boneca | null>(null);

  /** Controle do ângulo selecionado em cada card da galeria */
  cardPhotoIndex = signal<Record<string, number>>({});

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
      source: 'gallery_card',
    });
  }

  closeModalHighlight(): void {
    this.modalBoneca.set(null);
  }

  getWhatsappUrl(produto: Boneca): string {
    const idx = this.getCardPhotoIndex(produto.id);
    const angulo = produto.fotos[idx]?.angulo;
    return this.productService.getWhatsappUrl(produto, angulo);
  }

  onWhatsAppClick(produto: Boneca): void {
    this.analytics.trackWhatsAppClick(produto.nome, 'Sob consulta', produto.categoria);
  }

  onCustomOrderClick(): void {
    this.analytics.trackEvent('whatsapp_click', {
      button_location: 'gallery_custom_order',
      timestamp: new Date().toISOString(),
    });
  }
}
