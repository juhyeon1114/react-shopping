import React, { useState } from 'react';
import { Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import continents from '../LandingPage/sections/Datas';

const { TextArea } = Input;

const UploadProductionPage = (props) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
    const [images, setImages] = useState([]);

    const onSubmitForm = (e) => {
        console.log(e);
        e.preventDefault();
        if (!title || !desc || !price || !continent || !images) {
            alert('모든 값 입력');
            return ;
        }

        const body = {
            writer: props.user.userData._id,
            title,
            diescription: desc,
            price,
            images,
            continents : continent,
        }

        console.log(body);

        Axios.post('/api/product', body)
            .then(res => {
                if (res.data.success) {
                    alert('업로드 성공');
                    props.history.push('/')
                } else {
                    alert('업로드 실패');
                }
            })
            .catch(error => {
                console.error(error);
            })
    };
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangeDesc = (e) => {
        setDesc(e.target.value);
    };
    const onChangePrice = (e) => {
        setPrice(e.target.value);
    };
    const onChangeContinent = (e) => {
        setContinent(e.target.value);
    };
    const updateImages = (newImages) => {
        setImages(newImages);
    };

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2>여행 상품 업로드</h2>
            </div>

            <Form onSubmit={onSubmitForm}>
                <FileUpload refreshFunc={updateImages} />
                <br /><br />
                <label>이름</label>
                <Input onChange={onChangeTitle} value={title} />

                <br /><br />
                <label>설명</label>
                <TextArea onChange={onChangeDesc} value={desc} />

                <br /><br />
                <label>가격($)</label>
                <Input onChange={onChangePrice} value={price} type="number" />

                <br /><br />
                <select onChange={onChangeContinent} value={continent}>
                    {continents.map(continent => (
                        <option value={continent.id} key={continent.id}>{continent.value}</option>
                    ))}
                </select>

                <br /><br />
                <button type="submit">확인</button>
            </Form>
        </div>
    )
}

export default UploadProductionPage;