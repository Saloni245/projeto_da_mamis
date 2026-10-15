import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  /**
   * Envia um evento customizado para o Google Tag Manager (GTM) via dataLayer.
   */
  trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (typeof window !== 'undefined') {
      const win = window as unknown as { dataLayer?: unknown[] };
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  }

  /**
   * Registra clique de conversão no WhatsApp com contexto da peça/produto.
   */
  trackWhatsAppClick(productName: string, productPrice?: string, category?: string): void {
    this.trackEvent('whatsapp_click', {
      product_name: productName,
      product_price: productPrice,
      category: category || 'Geral',
      timestamp: new Date().toISOString(),
    });
  }
}

