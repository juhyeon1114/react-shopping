import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

const RadioBox = ({ list, handleFilters }) => {
    const [radioValue, setRadioValue] = useState(0);

    const onChangeRadio = (event) => {
        setRadioValue(event.target.value);
        handleFilters(event.target.value);
    };

    const renderRadioboxLists = list && list.map((value, idx) => {
        return (
            <>
                <Radio key={value.id} value={value.id}>{value.name}</Radio>
            </>
        )
    });

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Radio Box" key="1">
                    <Radio.Group onChange={onChangeRadio} value={radioValue}>
                        {renderRadioboxLists}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
    
};

export default RadioBox;