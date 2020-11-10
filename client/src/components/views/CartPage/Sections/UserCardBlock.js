import React from 'react';
import './UserCardBlock.css';

const UserCardBlock = ({ products, removeItem }) => {
    const renderCartImage = (images) => {
        if (images && images.length > 0) {
            let image = images[0];
            return `http://localhost:5000/${image}`
        }
    };
    
    const renderItems = () => (
        products && products.map((product, idx) => (
            <tr key={`userCardBlock${idx}`}>
                <td>
                    <img style={{ width: '70px' }} alt="product" src={renderCartImage(product.images)} />
                </td>
                <td>
                    {product.quantity} EA
                </td>
                <td>
                    $ {product.price}
                </td>
                <td>
                    <button onClick={() => removeItem(product._id)}>
                        remove
                    </button>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
};

export default UserCardBlock;