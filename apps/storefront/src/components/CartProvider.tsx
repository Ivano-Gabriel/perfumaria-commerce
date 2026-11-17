'use client';
import {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
import {PRODUCTS,type CartLine,addLine,sanitizeQuantity,subtotalCents,formatMoney} from '@/lib/shop';

type CartContextType={items:CartLine[];count:number;open:boolean;setOpen:(open:boolean)=>void;add:(productId:string,variantId:string,quantity?:number)=>void;change:(productId:string,variantId:string,quantity:number)=>void;remove:(productId:string,variantId:string)=>void;total:number};
const CartContext=createContext<CartContextType|null>(null);
const KEY='perfumaria-cart-demo-v1';
export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems]=useState<CartLine[]>([]);
  const [open,setOpen]=useState(false);
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{
    try{
      const raw=localStorage.getItem(KEY);
      if(raw){const parsed:unknown=JSON.parse(raw);
        if(Array.isArray(parsed))setItems(parsed.filter((line):line is CartLine=>
          typeof line==='object'&&line!==null&&typeof line.productId==='string'&&typeof line.variantId==='string'&&typeof line.quantity==='number'&&
          !!PRODUCTS.find(p=>p.id===line.productId)?.variants.find(v=>v.id===line.variantId)
        ).map(line=>({...line,quantity:sanitizeQuantity(line.quantity)})));
      }
    }catch{localStorage.removeItem(KEY)}
    setHydrated(true);
  },[]);
  useEffect(()=>{if(hydrated)localStorage.setItem(KEY,JSON.stringify(items));},[items,hydrated]);
  const add=useCallback((productId:string,variantId:string,quantity=1)=>{
    if(!PRODUCTS.some(p=>p.id===productId&&p.variants.some(v=>v.id===variantId)))return;
    setItems(current=>addLine(current,{productId,variantId,quantity}));setOpen(true);
  },[]);
  const change=useCallback((productId:string,variantId:string,quantity:number)=>setItems(current=>current.map(line=>line.productId===productId&&line.variantId===variantId?{...line,quantity:sanitizeQuantity(quantity)}:line)),[]);
  const remove=useCallback((productId:string,variantId:string)=>setItems(current=>current.filter(line=>line.productId!==productId||line.variantId!==variantId)),[]);
  const value=useMemo(()=>({items,count:items.reduce((n,line)=>n+line.quantity,0),open,setOpen,add,change,remove,total:subtotalCents(items)}),[items,open,add,change,remove]);
  return <CartContext.Provider value={value}>{children}<CartDrawer/></CartContext.Provider>;
}
export function useCart(){const ctx=useContext(CartContext);if(!ctx)throw new Error('useCart exige CartProvider');return ctx;}
function CartDrawer(){
 const {open,setOpen,items,change,remove,total}=useCart();
 useEffect(()=>{if(!open)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[open,setOpen]);
 if(!open)return null;
 return <div className="cart-scrim" onMouseDown={(e)=>{if(e.target===e.currentTarget)setOpen(false)}}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Seu carrinho demonstrativo">
  <div className="cart-head"><div><span className="eyebrow">Seu ritual começa aqui</span><h2>Meu carrinho</h2></div><button className="icon-button" onClick={()=>setOpen(false)} aria-label="Fechar carrinho">✕</button></div>
  {items.length===0?<div className="cart-empty"><span>◇</span><p>Seu carrinho está vazio.</p><button className="text-link" onClick={()=>setOpen(false)}>Explorar fragrâncias →</button></div>:<>
   <div className="cart-lines">{items.map(line=>{const product=PRODUCTS.find(p=>p.id===line.productId);const variant=product?.variants.find(v=>v.id===line.variantId);if(!product||!variant)return null;return <div className="cart-line" key={`${line.productId}-${line.variantId}`}><div className={`cart-mini-bottle ${product.visual}`}>◈</div><div><strong>{product.name}</strong><small>{variant.label} · {formatMoney(variant.priceCents)}</small><div className="cart-line-actions"><button onClick={()=>change(line.productId,line.variantId,line.quantity-1)} aria-label={`Diminuir quantidade de ${product.name}`}>−</button><span>{line.quantity}</span><button onClick={()=>change(line.productId,line.variantId,line.quantity+1)} aria-label={`Aumentar quantidade de ${product.name}`}>+</button><button className="remove" onClick={()=>remove(line.productId,line.variantId)}>Remover</button></div></div></div>})}</div>
   <div className="cart-bottom"><div className="cart-total"><span>Subtotal ilustrativo</span><strong>{formatMoney(total)}</strong></div><p>Frete e descontos serão calculados no checkout real.</p><button disabled className="button primary full">Checkout em implantação</button><small>Protótipo: nenhum pedido ou cobrança será criado.</small></div>
  </>}
 </aside></div>
}
