import test from 'node:test';
import assert from 'node:assert/strict';
import {PRODUCTS,filterProducts,subtotalCents,addLine,sanitizeQuantity} from './shop.ts';

test('busca sem acentos encontra nome e notas',()=>{
  assert.equal(filterProducts(PRODUCTS,'todos','ambar')[0]?.slug,'ambar-noturno');
  assert.equal(filterProducts(PRODUCTS,'todos','BERGAMOTA')[0]?.slug,'brisa-mineral');
});
test('filtro de categorias não mistura produtos',()=>{
  assert.ok(filterProducts(PRODUCTS,'automotivos','').every(p=>p.category==='automotivos'));
});
test('subtotal respeita a variante e a quantidade em centavos',()=>{
  assert.equal(subtotalCents([{productId:'a1',variantId:'5',quantity:2}]),9980);
});
test('linha repetida soma unidades sem duplicar e impõe limite',()=>{
  const result=addLine([{productId:'a1',variantId:'2',quantity:19}],{productId:'a1',variantId:'2',quantity:4});
  assert.deepEqual(result,[{productId:'a1',variantId:'2',quantity:20}]);
});
test('quantidade inválida vira um em vez de gerar valores negativos',()=>{
  assert.equal(sanitizeQuantity(-3),1);
  assert.equal(sanitizeQuantity(Number.NaN),1);
  assert.equal(sanitizeQuantity(1.8),1);
});
