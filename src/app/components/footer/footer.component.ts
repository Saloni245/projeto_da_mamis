import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private analytics = inject(AnalyticsService);
  currentYear = new Date().getFullYear();

  onWhatsAppClick() {
    this.analytics.trackEvent('whatsapp_click', {
      button_location: 'footer',
      timestamp: new Date().toISOString(),
    });
  }
}
