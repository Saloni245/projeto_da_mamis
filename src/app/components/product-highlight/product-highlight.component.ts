import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  inject,
} from '@angular/core';
import { Boneca, FotoBoneca, ProductService } from '../../services/product.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-product-highlight',
  standalone: true,
  imports: [],
  templateUrl: './product-highlight.component.html',
})
export class ProductHighlightComponent {
  private productService = inject(ProductService);
  private analytics = inject(AnalyticsService);

  /** Lista de todas as bonecas para permitir alternar no destaque da página */
  bonecas = input<Boneca[]>([]);

  /** Boneca inicialmente selecionada ou passada diretamente */
  bonecaSelecionada = input<Boneca | null>(null);

  /** Se verdadeiro, exibe como modal sobreposto (ex: ao clicar em um card na galeria) */
  isModal = input<boolean>(false);

  /** Evento emitido ao fechar o modal */
  closeModal = output<void>();

  /** Índice da boneca ativa quando exibido em modo vitrine com várias opções */
  activeBonecaId = signal<string>('');

  /** Índice da foto (ângulo: Frente, Perfil, Costas) ativa no momento */
  activePhotoIndex = signal<number>(0);

  /** Boneca atualmente em exibição no componente de destaque */
  currentBoneca = computed<Boneca | null>(() => {
    const explicit = this.bonecaSelecionada();
    const list = this.bonecas();
    const activeId = this.activeBonecaId();

    if (activeId && list.length > 0) {
      const found = list.find(b => b.id === activeId);
      if (found) return found;
    }
    if (explicit) return explicit;
    return list.length > 0 ? list[0] : null;
  });

  /** Foto ativa atualmente exibida em tamanho grande */
  currentPhoto = computed<FotoBoneca | null>(() => {
    const boneca = this.currentBoneca();
    if (!boneca || !boneca.fotos || boneca.fotos.length === 0) return null;
    const idx = this.activePhotoIndex();
    return boneca.fotos[idx] ?? boneca.fotos[0];
  });

  constructor() {
    effect(() => {
      const explicit = this.bonecaSelecionada();
      if (explicit) {
        this.activeBonecaId.set(explicit.id);
        this.activePhotoIndex.set(0);
      }
    });
  }

  selectBoneca(boneca: Boneca): void {
    this.activeBonecaId.set(boneca.id);
    this.activePhotoIndex.set(0);
    this.analytics.trackEvent('highlight_select_doll', {
      doll_id: boneca.id,
      doll_name: boneca.nome,
    });
  }

  selectPhoto(index: number): void {
    this.activePhotoIndex.set(index);
  }

  prevPhoto(): void {
    const boneca = this.currentBoneca();
    if (!boneca || boneca.fotos.length === 0) return;
    const total = boneca.fotos.length;
    this.activePhotoIndex.update(idx => (idx - 1 + total) % total);
  }

  nextPhoto(): void {
    const boneca = this.currentBoneca();
    if (!boneca || boneca.fotos.length === 0) return;
    const total = boneca.fotos.length;
    this.activePhotoIndex.update(idx => (idx + 1) % total);
  }

  getWhatsappUrl(boneca: Boneca): string {
    const photo = this.currentPhoto();
    return this.productService.getWhatsappUrl(boneca, photo?.angulo);
  }

  onContactClick(boneca: Boneca): void {
    this.analytics.trackWhatsAppClick(
      boneca.nome,
      'Sob consulta',
      `${boneca.categoria} - Destaque`
    );
  }

  onClose(): void {
    this.closeModal.emit();
  }
}

