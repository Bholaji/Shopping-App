import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss'

const CartIcon = () =>
{
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

    const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    // const 


    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={toogleIsCartOpen} />
            <span className='item-count'>{cartCount}</span>
        </div>)
}

export default CartIcon;