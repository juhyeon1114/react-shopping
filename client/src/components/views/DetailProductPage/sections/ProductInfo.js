import React from 'react';
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions'

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(addToCart(product._id))
    };

    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Price">
                    {product.price}
                </Descriptions.Item>
                <Descriptions.Item label="Sold">
                    {product.sold}
                </Descriptions.Item>
                <Descriptions.Item label="View">
                    {product.views}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {product.description}
                </Descriptions.Item>
            </Descriptions>

            <br /><br />

            <div style={{ display: 'flex',  justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
};

export default ProductInfo;