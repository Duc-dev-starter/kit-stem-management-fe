import { Select } from 'antd';
import React from 'react';

type CustomSelectProps = {
    value: string;
    options: string[];
    getColor: (option: string) => string;
    getLabel: (option: string) => string;
    className?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
    value,
    options,
    getColor,
    getLabel,
    className
}) => {
    return (
        <Select defaultValue={value} className={className || ''}>
            {options.map((option) => (
                <Select.Option key={option} value={option}>
                    <span className={getColor(option)}>{getLabel(option)}</span>
                </Select.Option>
            ))}
        </Select>
    );
};

export default CustomSelect;
