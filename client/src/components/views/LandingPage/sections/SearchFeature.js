import React, { useState } from 'react';
import { Input } from 'antd';
const { Search } = Input;
 
const SearchFeature = ({ refreshFunction }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const searchHandler = (event) => {
        setSearchTerm(event.target.value);
        refreshFunction(event.target.value);
    };

    return (
        <div>
            <Search
                placeholder='input search text'
                onChange={searchHandler}
                style={{ width: 200 }}
                value={searchTerm}
            />
        </div>
    )
};

export default SearchFeature;