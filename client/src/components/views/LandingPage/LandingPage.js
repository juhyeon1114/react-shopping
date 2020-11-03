import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Card, Icon, Col, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import { continents, price } from './sections/Datas';
import CheckBox from "./sections/CheckBox";
import RadioBox from "./sections/RadioBox";
import SearchFeature from './sections/SearchFeature';

const LIMIT = 4;

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [postSize, setPostSize] = useState(0);
    const [filters, setFilters] = useState({ continents: [], price: [] });
    const [loadMore, setLoadMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const body = {
            skip,
            limit: LIMIT,
            filters,
            searchTerm
        };

        Axios.post('/api/product/products', body)
            .then(res => {
                if (res.data.success) {
                    if (res.data.productInfo.length === 0) {
                        alert('더 이상 가져올 상품이 없습니다.')
                    }
                    setPostSize(res.data.productInfo.length);
                    loadMore ? setProducts(prev => prev.concat(res.data.productInfo)) : setProducts(res.data.productInfo) ;
                } else {
                    alert('상품 조회 실패');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [filters, loadMore, searchTerm, skip]);
      

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
        setLoadMore(true);
        setSkip(prev => Number(prev) + LIMIT);
    };

    const handlePrice = (value) => {
        let arr = [];
        for (let key in price) {
            if (price[key].id === parseInt(value, 10)) {
                arr = price[key].array;
            }
        }
        return arr;
    };

    const handleFilters = (filter, category) => {
        const newFilters = {...filters};
        newFilters[category] = category === 'price' ? handlePrice(filter) : filter;
        setLoadMore(false);

        setFilters(newFilters);
        setSkip(0);
    };

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        setSkip(0);
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
                    <RadioBox list={price} handleFilters={filter => handleFilters(filter, 'price')} />
                </Col>
            </Row>

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>

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
