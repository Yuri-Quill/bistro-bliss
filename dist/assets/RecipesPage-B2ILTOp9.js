import{d,b as h,j as e,C as m,e as _,L as x,R as u,f as j,h as b}from"./index-BHBgYMPU.js";const P=()=>{const[i,n]=d(),{loading:p,recipes:o,total:c}=h(a=>a.recipes),s=Number(i.get("page")||1),t=Number(i.get("limit")||8),r=c>0?Math.ceil(c/t):1,l=()=>{const a=s+1;n({page:String(a),limit:String(t)})},g=()=>{const a=Math.max(1,s-1);n({page:String(a),limit:String(t)})};return e.jsx("section",{className:"recipes-page",children:e.jsxs(m,{children:[e.jsx("h2",{className:"recipes-page__title",children:"Our Recipes & Articles"}),e.jsx("p",{className:"recipes-page__text",children:"We consider all the drivers of change gives you the components you need to change to create a truly happens."}),e.jsx("ul",{className:"recipes-page__list",children:p?e.jsx(_,{}):o.map(a=>e.jsx("li",{className:"recipes-page__item",children:e.jsx(x,{className:"recipes-page__link",to:`/recipes/${a._id}`,children:e.jsx(u,{data:a})})},a._id))}),e.jsxs("nav",{className:"recipes-page__pagination-nav",children:[e.jsx("button",{type:"button",className:"recipes-page__pagination-btn recipes-page__pagination-btn--prev",onClick:g,disabled:s===1,children:e.jsx(j,{})}),e.jsxs("span",{className:"recipes-page__pagination-current",children:["Page ",s," of ",r]}),e.jsx("button",{type:"button",className:"recipes-page__pagination-btn recipes-page__pagination-btn--next",onClick:l,disabled:s>=r,children:e.jsx(b,{})})]})]})})};export{P as default};
//# sourceMappingURL=RecipesPage-B2ILTOp9.js.map
