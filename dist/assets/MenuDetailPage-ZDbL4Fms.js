import{u as _,a as h,k as p,c as x,j as e,C as g,L as j,B as N}from"./index-DcgVXLls.js";import{d as b,e as f,b as $}from"./vendor-C_CdKm9A.js";import{N as y}from"./no-img-B2VyLHU4.js";const v=()=>{var r;const c=_(),m=b(),{loading:o,selectedItem:a,categories:u}=h(i=>i.menu),{categories:l,id:t}=f();let s;l==="all"?(s=(r=u.find(i=>i.items.some(n=>n._id===t)))==null?void 0:r.category,s&&m(`/menu/${s}/${t}`,{replace:!0})):s=l,console.log(s),$.useEffect(()=>{t&&s&&c(p({category:s,id:t}))},[c,t,s]);const d=x("menu-detail__subtext","menu-detail__alcohol",{"menu-detail__alcohol--active":a==null?void 0:a.alcohol_content});return e.jsx("section",{className:"menu-detail",children:e.jsxs(g,{children:[o?e.jsx(j,{}):a&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"menu-detail__title",children:a.name}),e.jsxs("figure",{className:"menu-detail__figure",children:[e.jsx("img",{className:"menu-detail__image",src:`${a.picture?a==null?void 0:a.picture:y}`,alt:`image for ${a.name}`,width:500,height:500,loading:"lazy"}),e.jsxs("figcaption",{className:"menu-detail__caption",children:[e.jsxs("h4",{className:"menu-detail__subtitle",children:["Price:"," ",e.jsx("span",{className:"menu-detail__subtext menu-detail__subtext--price",children:`$ ${a.price}`})]}),e.jsxs("div",{className:"menu-detail__list-wrapper",children:[e.jsx("h4",{className:"menu-detail__subtitle menu-detail__subtitle--ingredients",children:"Ingredients :"}),e.jsx("ul",{className:"menu-detail__list",children:a.ingredients.map((i,n)=>e.jsx("li",{className:"menu-detail__list-item",children:i},n))})]}),e.jsxs("h4",{className:"menu-detail__subtitle",children:["Calories:"," ",e.jsx("span",{className:"menu-detail__subtext menu-detail__subtext--calories",children:a.calories})]}),e.jsxs("h4",{className:"menu-detail__subtitle",children:["Preparation time:"," ",e.jsx("span",{className:"menu-detail__subtext menu-detail__subtext--prep-time",children:`${a.preparation_time} m.`})]}),l==="drinks"&&e.jsxs("h4",{className:"menu-detail__subtitle",children:["Alcohol:"," ",e.jsx("span",{className:d,children:a.alcohol_content?"Contains Alcohol":"No Alcohol"})]})]})]})]}),e.jsx(N,{className:"menu-detail__link",href:`/menu?category=${l}&page=1`,isActive:!0,aria:"Go back to menu page",children:"Back to menu"})]})})};export{v as default};
//# sourceMappingURL=MenuDetailPage-ZDbL4Fms.js.map
