// @flow

import * as React from "react";
import './bookshelf-changer.style.css';

export type BookshelfChangerPropTypes = {
    options: Array<Option>;
    onChanged: Function;
}

export type Option = {
    value: string;
    label: string;
    isDisabled: boolean;
    selectedValue: string;
}

export const BookshelfChanger = ({options, selectedValue, onChanged}) => {

    var handleChange = (e) => {
      onChanged(e.target.value);
    };

    var renderOptions = () => {
        let retValues: any[] = [];
        options.map((option: Option, index: number) => {
            retValues.push(option.isDisabled ?
                <option key={index} value={option.value} disabled>{option.label}</option> :
                <option key={index} value={option.value} >{option.label}</option>);
        });
        return retValues;
    }

    return (<div>
        <div className="book-shelf-changer">
            <select value={selectedValue} onChange={handleChange}>
                {renderOptions()}
            </select>
        </div>
    </div>)
};