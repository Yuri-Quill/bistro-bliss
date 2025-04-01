import{j as e,u as v,a as P,g as M,C as $,L as b,b as I,d as C}from"./index-DcgVXLls.js";import{L as k,d as w,u as L,b as A,N as x}from"./vendor-C_CdKm9A.js";import{N as S}from"./no-img-B2VyLHU4.js";const E=({data:n,categories:s})=>e.jsx(k,{className:"menu-card",to:`/menu/${s}/${n._id}`,children:e.jsxs("figure",{className:"menu-card__figure",children:[e.jsx("img",{className:"menu-card__image",src:n.picture,onError:({currentTarget:t})=>{t.onerror=null,t.src=S},alt:`Picture of ${n.name}`,width:306,height:230,loading:"lazy"}),e.jsxs("figcaption",{className:"menu-card__caption",children:[e.jsx("span",{className:"menu-card__price",children:`$ ${n.price}`}),e.jsx("h3",{className:"menu-card__title",children:n.name}),e.jsx("p",{className:"menu-card__ingredients",children:n.ingredients.join(", ")})]})]})}),F=({categories:n,currentCategory:s,currentPage:t})=>{const m=w(),l=r=>{m(r.target.value)};return e.jsxs("select",{className:"menu-dropdown",onChange:l,value:s?`/menu?category=${s}&page=${t}`:`/menu?page=${t}`,"aria-label":"Select menu category",children:[e.jsx("option",{className:"menu-dropdown__option",value:`/menu?page=${t}`,children:"All"}),n.map(r=>e.jsx("option",{className:"menu-dropdown__option",value:`/menu?category=${r.category}&page=${t}`,children:r.category.charAt(0).toUpperCase()+r.category.slice(1)},r.category))]})},q=()=>{const n=v(),{categories:s,loading:t,error:m}=P(a=>a.menu),[l,r]=L(),c=l.get("category")||null,j=l.get("page")||"1",g=8,o=Math.max(1,parseInt(j,10)||1);A.useEffect(()=>{s.length===0&&!t&&n(M())},[n,s,t]);const d=(()=>{if(!s.length)return[];if(c){const a=s.find(i=>i.category===c);return a?a.items:[]}return s.flatMap(a=>a.items)})(),N=()=>{const a=d.length,i=Math.ceil(a/g),_=(Math.min(Math.max(1,o),i||1)-1)*g;return{paginatedItems:d.slice(_,_+g),totalPages:i}},{paginatedItems:h,totalPages:u}=N(),p=a=>{const i=new URLSearchParams(l);i.set("page",a.toString()),c&&i.set("category",c),r(i,{replace:!0})},f=()=>{p(Math.max(o-1,1))},y=()=>{p(Math.min(o+1,u))};return e.jsx("section",{className:"menu",children:e.jsxs($,{children:[e.jsx("h2",{className:"menu__title",children:"Our Menu"}),e.jsx("p",{className:"menu__text",children:"Our menu is designed to give you the flexibility to create a truly personalized dining experience. With a wide range of dishes to choose from, you're sure to find something that suits your taste."}),t?e.jsx(b,{}):m?e.jsxs("p",{className:"menu__error",children:["Error: ",m]}):e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"menu__nav",children:[e.jsxs("ul",{className:"menu__nav-list",children:[e.jsx("li",{className:"menu__nav-list-item",children:e.jsx(x,{className:({isActive:a})=>`menu__nav-list-link ${a&&c===null?"menu__nav-list-link--active":""}`,to:"/menu?page=1",end:!0,children:"All"})}),s.map(a=>e.jsx("li",{className:"menu__nav-list-item",children:e.jsx(x,{className:({isActive:i})=>`menu__nav-list-link ${i&&a.category===c?"menu__nav-list-link--active":""}`,to:`/menu?category=${a.category}&page=1`,children:a.category.charAt(0).toUpperCase()+a.category.slice(1)})},a.category))]}),e.jsx(F,{categories:s,currentCategory:c,currentPage:o})]}),e.jsx("ul",{className:"menu__items-list",children:h.length>0?h.map(a=>e.jsx("li",{className:"menu__item",children:e.jsx(E,{data:a,categories:c||"all"})},a._id)):e.jsx("p",{children:"No items available"})}),u>1&&e.jsxs("div",{className:"menu__pagination",children:[e.jsx("button",{className:"menu__pagination-button",onClick:f,type:"button",disabled:o===1,children:e.jsx(I,{})}),e.jsxs("span",{className:"menu__pagination-info",children:["Page ",o," of ",u]}),e.jsx("button",{className:"menu__pagination-button",onClick:y,type:"button",disabled:o===u,children:e.jsx(C,{})})]})]})]})})};export{q as default};
//# sourceMappingURL=MenuPage-BdIErTyy.js.map
