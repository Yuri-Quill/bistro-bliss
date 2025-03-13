import IHeaderMenu from "../interfaces/header-menu.interface";

const headerMenuData : IHeaderMenu[] =[
    {
        name:'Home',
        href: '/',
        body:'Main page of the website'
    },
    {
        name:'About',
        href: '/about',
        body:'About page'
    },
    {
        name:'Menu',
        href: '/menu',
        body:'Menu page'
    },
    {
        name:'Recipes',
        href: '/recipes?page=1&limit=10',
        body:'Recipes page'
    },
    {
        name:'Contact',
        href: '/contact',
        body:'Contact page'
    },
]
export default headerMenuData
