import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';

const { TextArea } = Input;

const CONTINENTS = [
    {id:1, value: 'Africa'},
    {id:2, value: 'Europe'},
    {id:3, value: 'Asia'},
    {id:4, value: 'North America'},
    {id:5, value: 'South America'},
    {id:6, value: 'Austrailia'},
    {id:7, value: 'Antarctica'}
];

const UploadProductionPage = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
    const [images, setImages] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
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
        console.log(images);
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
                    {CONTINENTS.map(continent => (
                        <option value={continent.id} key={continent.id}>{continent.value}</option>
                    ))}
                </select>

                <br /><br />
                <Button type="submit">확인</Button>
            </Form>
        </div>
    )
}

export default UploadProductionPage;