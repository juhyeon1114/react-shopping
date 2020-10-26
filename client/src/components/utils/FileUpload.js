import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = ({ refreshFunc }) => {
    const [images, setImages] = useState([]);

    const onDropImage = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0])

        axios.post('/api/product/image', formData, config )
            .then(res => {
                if (res.data.success) {
                    setImages(prev => {
                        refreshFunc([...prev, res.data.filePath]);
                        return [...prev, res.data.filePath]
                    })
                } else {
                    alert('파일을 저장하는데 실패함');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const onClickImage = (image) => {
        const idx = images.indexOf(image);

        let newImages = [...images];
        newImages.splice(idx, 1);

        setImages(newImages);
        refreshFunc(newImages);
        // axios.delete('/api/product/image/delete')
        //     .then(res => {
                
        //     })
        //     .catch(err => {
        //         alert('이미지 삭제 실패');
        //         console.error(err);
        //     })

        
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={onDropImage}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div style={{ width:300, height: 240, border: '1px solid lightgray', display:'flex', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </Dropzone>
            
            <div style={{ display: 'flex', width: '350px', height:'240px', overflowX: 'scroll'}}>
                {images.map((image, idx) => (
                    <div key={idx}>
                        <img
                            style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                            alt="uploaded img"
                            onClick={() => onClickImage(image)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FileUpload;