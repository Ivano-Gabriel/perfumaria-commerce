/** Somente dados de DEMONSTRAÇÃO. Nenhum item representa oferta ou disponibilidade real. */
export type Category = 'decants' | 'inteiros' | 'automotivos' | 'kits';
export type Variant = { id: string; label: string; priceCents: number };
export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: Category;
  mood: string;
  summary: string;
  notes: string[];
  season: string;
  accent: string;
  visual: 'amber' | 'blue' | 'rose' | 'ivory' | 'forest' | 'copper';
  variants: Variant[];
};
export type CartLine = { productId: string; variantId: string; quantity: number };

export const PRODUCTS: Product[] = [
  { id:'a1', slug:'ambar-noturno', name:'Âmbar Noturno', collection:'Coleção demonstrativa', category:'decants', mood:'Amadeirado · Intenso', summary:'Uma composição conceitual quente e envolvente para descobrir a experiência dos decants.', notes:['Âmbar','Cedro','Baunilha'], season:'Noite e dias frios', accent:'#ac7545', visual:'amber', variants:[{id:'2',label:'2 ml',priceCents:2490},{id:'5',label:'5 ml',priceCents:4990},{id:'10',label:'10 ml',priceCents:8590},{id:'20',label:'20 ml',priceCents:15590}] },
  { id:'b2', slug:'brisa-mineral', name:'Brisa Mineral', collection:'Coleção demonstrativa', category:'decants', mood:'Fresco · Aquático', summary:'Uma ideia de fragrância leve e moderna, ideal para mostrar como o catálogo apresenta notas e ocasiões.', notes:['Bergamota','Sal marinho','Almíscar'], season:'Dia e verão', accent:'#7eaeb1', visual:'blue', variants:[{id:'2',label:'2 ml',priceCents:1990},{id:'5',label:'5 ml',priceCents:3890},{id:'10',label:'10 ml',priceCents:6990}] },
  { id:'c3', slug:'fleur-de-lune', name:'Fleur de Lune', collection:'Coleção demonstrativa', category:'decants', mood:'Floral · Delicado', summary:'Perfil floral fictício criado apenas para testar a experiência de descoberta e compra.', notes:['Pêra','Rosa','Sândalo'], season:'Primavera e encontros', accent:'#c5938e', visual:'rose', variants:[{id:'2',label:'2 ml',priceCents:2290},{id:'5',label:'5 ml',priceCents:4490},{id:'10',label:'10 ml',priceCents:7990}] },
  { id:'d4', slug:'cedar-08', name:'Cedar Nº 08', collection:'Coleção demonstrativa', category:'inteiros', mood:'Elegante · Amadeirado', summary:'Exemplo de produto em frasco integral, preparado para receber fotos reais de marcas comercializadas.', notes:['Pimenta','Madeira seca','Vetiver'], season:'Versátil', accent:'#a07d5f', visual:'ivory', variants:[{id:'100',label:'100 ml',priceCents:29990}] },
  { id:'e5', slug:'rota-verde', name:'Rota Verde', collection:'Coleção demonstrativa', category:'automotivos', mood:'Verde · Limpo', summary:'Exemplo de aromatizador de ambiente automotivo com ficha própria.', notes:['Folhas verdes','Limão','Musgo'], season:'Uso cotidiano', accent:'#7b9a79', visual:'forest', variants:[{id:'8',label:'8 ml',priceCents:3990}] },
  { id:'f6', slug:'kit-primeiras-notas', name:'Kit Primeiras Notas', collection:'Coleção demonstrativa', category:'kits', mood:'Descoberta · Presente', summary:'Exemplo de kit de descoberta com seleção de três perfis diferentes.', notes:['Fresco','Floral','Amadeirado'], season:'Todas as ocasiões', accent:'#b3835c', visual:'copper', variants:[{id:'kit',label:'3 × 2 ml',priceCents:5990}] }
];

export const CATEGORIES: { id:'todos'|Category; label:string }[] = [
  {id:'todos',label:'Todos'},{id:'decants',label:'Decants'},{id:'inteiros',label:'Perfumes'},{id:'automotivos',label:'Automotivos'},{id:'kits',label:'Kits'}
];
export function formatMoney(cents:number):string {
  return new Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'}).format(cents/100);
}
export function filterProducts(products:Product[], category:'todos'|Category, query:string):Product[] {
  const normalized=query.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  return products.filter(p => (category==='todos'||p.category===category) &&
   [p.name,p.mood,p.summary,...p.notes].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(normalized));
}
export function sanitizeQuantity(quantity:number):number {
  return Number.isFinite(quantity) ? Math.max(1,Math.min(20,Math.floor(quantity))) : 1;
}
export function subtotalCents(items:CartLine[], products:Product[]=PRODUCTS):number {
  return items.reduce((sum,line)=>{
    const variant=products.find(p=>p.id===line.productId)?.variants.find(v=>v.id===line.variantId);
    if(!variant) return sum;
    return sum+variant.priceCents*sanitizeQuantity(line.quantity);
  },0);
}
export function addLine(items:CartLine[], newLine:CartLine):CartLine[] {
  const quantity=sanitizeQuantity(newLine.quantity);
  const existing=items.find(line=>line.productId===newLine.productId&&line.variantId===newLine.variantId);
  if(!existing) return [...items,{...newLine,quantity}];
  return items.map(line=>line===existing?{...line,quantity:sanitizeQuantity(line.quantity+quantity)}:line);
}
