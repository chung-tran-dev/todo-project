import React from 'react';
import './index.scss';

interface IFormInput {
    title: string;
    content: any;
    errorMessage?: string;
}

export const FormInput = (props: IFormInput) => {
    const { title, content, errorMessage } = props;
    return (
        <div className="form-input" style={{ width: '45%' }}>
            <label>{title}</label><br />
            <input {...content} /><br />
            <span>{errorMessage}</span>
        </div>
    )
}
