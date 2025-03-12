import Container from '../Container/Container'

import menuPeekData from '../../shared/data/menu-peek.data'

import './MenuPeekSection.scss'
import MenuPeekCard from './MenuPeekCard/MenuPeekCard'



const MenuPeekSection = () => {
    return (
        <section className='menu-peek__section'>
            <Container>
                <h2 className='menu-peek__title'>Browse Our Menu</h2>

                <ul className='menu-peek__list'>
                {menuPeekData.map((item)=>(
                    <li className='menu-peek__item' key={item.name}>
                        <MenuPeekCard data={item}/>
                    </li>
                ))}
                </ul>
            </Container>
        </section>
    )
}

export default MenuPeekSection