import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty } from 'antd';
import PayPal from '../../utils/PayPal';

const CartPage = ({ user }) => {
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let cartItems = [];
        if (user.userData && user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                });

                dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(res => {
                        setTotal(calculateTotal(res.payload));
                    })
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.userData]); 

    const calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.forEach(detail => {
            total += parseInt(detail.price) * parseInt(detail.quantity);
        });
        setShowTotal(true);
        return total;
    };

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(res => {
                if (res.payload.productInfo.length <= 0) {
                    setShowTotal(false);
                }
            })
    };

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            
            <UserCardBlock products={user.cartDetail} removeItem={removeFromCart} />

            {
                showTotal
                    ?
                        <>
                            <div style={{ marginTop: '3rem' }}>
                                <h2>Total Amount: ${total}</h2>
                            </div>
                            <PayPal total={total}/>
                        </>
                    :
                        <>
                            <br />
                            <Empty description={false}></Empty>
                        </>
            }
            
            

        </div>
    )
}

export default CartPage;