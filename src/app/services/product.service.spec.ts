import { TestBed } from '@angular/core/testing';
import { ProductService, Boneca } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('deve ser criado corretamente', () => {
    expect(service).toBeTruthy();
  });

  it('deve carregar exatamente as 4 bonecas do JSON estático', () => {
    const bonecas = service.getAllBonecas();
    expect(bonecas).toBeDefined();
    expect(bonecas.length).toBe(4);

    const ids = bonecas.map(b => b.id);
    expect(ids).toEqual([
      'boneca-azul-xadrez',
      'boneca-floral-poa',
      'boneca-loira-verde',
      'boneca-lilas-floral',
    ]);
  });

  it('deve retornar as 4 bonecas em destaque em getFeaturedBonecas()', () => {
    const destaques = service.getFeaturedBonecas();
    expect(destaques.length).toBe(4);
    destaques.forEach(boneca => {
      expect(boneca.destaque).toBe(true);
    });
  });

  it('deve buscar uma boneca pelo ID corretamente ou retornar undefined se não existir', () => {
    const boneca = service.getBonecaById('boneca-azul-xadrez');
    expect(boneca).toBeDefined();
    expect(boneca?.nome).toContain('Vestido Azul & Xadrez');

    const inexistente = service.getBonecaById('id-inexistente');
    expect(inexistente).toBeUndefined();
  });

  it('cada boneca deve possuir exatamente 3 fotos (Frente, Perfil, Costas) com URLs válidas e referências do Google Drive (driveId e driveUrl)', () => {
    const bonecas = service.getAllBonecas();

    bonecas.forEach((boneca: Boneca) => {
      expect(boneca.imagemCapa).toMatch(/^\/images\/bonecas\/.+\.jpeg$/);
      expect(boneca.fotos).toBeDefined();
      expect(boneca.fotos.length).toBe(3);

      const angulos = boneca.fotos.map(f => f.angulo);
      expect(angulos).toEqual(['Frente', 'Perfil', 'Costas']);

      boneca.fotos.forEach(foto => {
        expect(foto.url).toMatch(/^\/images\/bonecas\/boneca-.+-(frente|perfil|costas)\.jpeg$/);
        expect(foto.legenda.length).toBeGreaterThan(5);
        expect(foto.driveId).toBeDefined();
        expect(foto.driveId?.length).toBeGreaterThan(10);
        expect(foto.driveUrl).toBeDefined();
        expect(foto.driveUrl).toBe(`https://drive.google.com/file/d/${foto.driveId}/view`);
      });
    });
  });

  it('nenhuma boneca deve conter preço fixo (R$) nos dados de disponibilidade ou descrição', () => {
    const bonecas = service.getAllBonecas();
    bonecas.forEach(boneca => {
      expect(boneca.disponibilidade).not.toContain('R$');
      expect(boneca.descricao).not.toContain('R$');
      expect(JSON.stringify(boneca)).not.toContain('R$');
    });
  });

  it('deve gerar corretamente o link do WhatsApp sem preço e com o nome da boneca (sem ângulo)', () => {
    const boneca = service.getBonecaById('boneca-azul-xadrez')!;
    const url = service.getWhatsappUrl(boneca);

    expect(url).toContain('https://wa.me/5511974169141?text=');
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain(boneca.nome);
    expect(decoded).toContain('Ateliê Fio & Arte');
    expect(decoded).not.toContain('R$');
    expect(decoded).not.toContain('vi as fotos de');
  });

  it('deve gerar corretamente o link do WhatsApp sem preço, com o nome da boneca e com o ângulo informado', () => {
    const boneca = service.getBonecaById('boneca-floral-poa')!;
    const url = service.getWhatsappUrl(boneca, 'Perfil');

    expect(url).toContain('https://wa.me/5511974169141?text=');
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain(boneca.nome);
    expect(decoded).toContain('(vi as fotos de perfil no site)');
    expect(decoded).not.toContain('R$');
  });
});
