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

  it('deve carregar todas as 8 bonecas cadastradas no JSON estático', () => {
    const bonecas = service.getAllBonecas();
    expect(bonecas).toBeDefined();
    expect(bonecas.length).toBe(8);

    const ids = bonecas.map(b => b.id);
    expect(ids).toEqual([
      'boneca-azul-xadrez',
      'boneca-floral-poa',
      'boneca-loira-verde',
      'boneca-lilas-floral',
      'casal-noivinhos-fofuchos',
      'boneca-camponesa-chapeu',
      'boneca-pendulo-chaveiro',
      'boneca-boina-docura',
    ]);
  });

  it('deve retornar todas as bonecas marcadas em destaque em getFeaturedBonecas()', () => {
    const destaques = service.getFeaturedBonecas();
    expect(destaques.length).toBe(8);
    destaques.forEach(boneca => {
      expect(boneca.destaque).toBe(true);
    });
  });

  it('deve buscar uma boneca pelo ID corretamente ou retornar undefined se não existir', () => {
    const boneca = service.getBonecaById('casal-noivinhos-fofuchos');
    expect(boneca).toBeDefined();
    expect(boneca?.nome).toContain('Casal de Noivinhos');

    const inexistente = service.getBonecaById('id-inexistente');
    expect(inexistente).toBeUndefined();
  });

  it('cada boneca deve possuir fotos com ângulos e URLs válidas na CDN S3', () => {
    const bonecas = service.getAllBonecas();

    bonecas.forEach((boneca: Boneca) => {
      expect(boneca.imagemCapa).toMatch(/^https:\/\/fb-integrador-vehicle-images\.s3\.sa-east-1\.amazonaws\.com\/.+\.jpeg$/);
      expect(boneca.fotos).toBeDefined();
      expect(boneca.fotos.length).toBeGreaterThanOrEqual(3);

      boneca.fotos.forEach(foto => {
        expect(foto.url).toMatch(/^https:\/\/fb-integrador-vehicle-images\.s3\.sa-east-1\.amazonaws\.com\/.+\.jpeg$/);
        expect(foto.legenda.length).toBeGreaterThan(5);
        expect(foto.angulo).toBeDefined();
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
    const boneca = service.getBonecaById('casal-noivinhos-fofuchos')!;
    const url = service.getWhatsappUrl(boneca);

    expect(url).toContain('https://wa.me/5511974169141?text=');
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain(boneca.nome);
    expect(decoded).toContain('Ateliê Fio & Arte');
    expect(decoded).not.toContain('R$');
    expect(decoded).not.toContain('vi as fotos de');
  });

  it('deve gerar corretamente o link do WhatsApp sem preço, com o nome da boneca e com o ângulo informado', () => {
    const boneca = service.getBonecaById('boneca-camponesa-chapeu')!;
    const url = service.getWhatsappUrl(boneca, 'Perfil');

    expect(url).toContain('https://wa.me/5511974169141?text=');
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain(boneca.nome);
    expect(decoded).toContain('(vi as fotos de perfil no site)');
    expect(decoded).not.toContain('R$');
  });
});
