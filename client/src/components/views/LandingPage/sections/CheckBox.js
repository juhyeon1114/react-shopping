import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

const CheckBox = ({ list, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const onChangeCheckBox = (value) => {
        const tempIdx = checked.indexOf(value.id);
        let newChecked = [...checked];
        tempIdx === -1 ? newChecked.push(value.id) : newChecked.splice(tempIdx, 1);
        setChecked(newChecked);
        handleFilters(newChecked);
    };

    const renderCheckboxLists = list && list.map((value, idx) => {
        return (
            <>
                <Checkbox onChange={() => onChangeCheckBox(value)} key={`checkbox${idx}`} />
                <span>{value.value}</span>
            </>
        )
    });

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Check Box" key="1">
                    {renderCheckboxLists}
                </Panel>
            </Collapse>
        </div>
    )
    
};

export default CheckBox;

