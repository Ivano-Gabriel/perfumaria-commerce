import type {Product} from '@/lib/shop';
export function Bottle({visual,large=false}:{visual:Product['visual'];large?:boolean}){
 return <div className={`bottle-scene ${visual}${large?' big':''}`} aria-label="Ilustração conceitual de embalagem, não é fotografia real" role="img"><div className="bottle-shadow"/><div className="bottle"><div className="bottle-neck"/><div className="bottle-cap"/><div className="bottle-glass"><div className="bottle-highlight"/><div className="bottle-label"><span className="label-star">✦</span><span>ESSENCE</span><small>EAU DE PARFUM</small></div></div></div></div>;
}
