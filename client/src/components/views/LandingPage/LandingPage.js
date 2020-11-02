import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Card, Icon, Col, Row, Collapse } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import continents from '../LandingPage/sections/Datas';
import CheckBox from "../LandingPage/sections/CheckBox";
import RadioBox from "../LandingPage/sections/RadioBox";

const LIMIT = 4;

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [postSize, setPostSize] = useState(0);

    useEffect(() => {
        const body = { skip, limit: LIMIT };

        Axios.post('/api/product/products', body)
            .then(res => {
                if (res.data.success) {
                    if (res.data.productInfo.length === 0) {
                        alert('더 이상 가져올 상품이 없습니다.')
                    }
                    setPostSize(res.data.productInfo.length);
                    setProducts(prev => prev.concat(res.data.productInfo));
                } else {
                    alert('상품 조회 실패');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [skip]);
      

    const renderCards = products.map((product, idx) => {
        return (
            <Col lg={6} md={8} xs={24} key={idx}>
                <Card cover={<ImageSlider images={product.images} />} >
                    <Card.Meta
                        title={product.title}
                        description={`${product.price}`}
                    />
                </Card>
            </Col>
        )
    });

    const loadMoreHandler = () => {
        setSkip(prev => Number(prev) + LIMIT);
    };
    
    const handleFilters = (newChecked) => {
        console.log(newChecked);
    };

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="rocket"></Icon></h2>
            </div>

            <Row gutter={[16, 16]}>
                <Col sm={12} xs={24}>
                    {/* check box */}
                    <CheckBox list={continents} handleFilters={filter => handleFilters(filter, 'continents')} />
                </Col>

                <Col sm={12} xs={24}>
                    {/* radio box */}
                    <RadioBox />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            {
                postSize > 0
                ? <div><button onClick={loadMoreHandler}>더보기</button></div>
                : null
            }
            
        </div>
    )
}

export default LandingPage
