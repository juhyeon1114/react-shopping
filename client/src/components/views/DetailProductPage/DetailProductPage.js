import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ProductImage from './sections/ProductImage';
import ProductInfo from './sections/ProductInfo';
import { Row, Col } from 'antd';

const DetailProductPage = (props) => {
    const productId = props.match.params.productId;
    const [product, setProduct] = useState({});

    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(res => {
                console.log(res);
                setProduct(res.data.product[0]);
            })
            .catch(error => {
                console.error(error);
            });
    }, [productId]);

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    <ProductImage product={product} />
                </Col>
                <Col lg={12} sm={24}>
                    <ProductInfo product={product} />
                </Col>
            </Row>
            
        </div>
    )
};

export default DetailProductPage;