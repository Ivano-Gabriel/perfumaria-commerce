import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {PRODUCTS} from '@/lib/shop';
import {ProductDetail} from '@/components/ProductDetail';
export function generateStaticParams(){return PRODUCTS.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const product=PRODUCTS.find(p=>p.slug===slug);
  return {title:product?.name??'Produto',description:product?.summary,robots:{index:false,follow:false}};
}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const product=PRODUCTS.find(p=>p.slug===slug);
  if(!product) notFound();return <ProductDetail product={product}/>;
}
