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

export class BookshelfChanger extends React.PureComponent<BookshelfChangerPropTypes,any> {

    handleChange = (e) => {
      this.props.onChanged(e.target.value);
    };

    renderOptions() {
        const{options} = this.props;
        let retValues: any[] = [];
        options.map((option: Option, index: number) => {
            retValues.push(option.isDisabled ?
                <option key={index} value={option.value} disabled>{option.label}</option> :
                <option key={index} value={option.value} >{option.label}</option>);
        });
        return retValues;
    }

    render() {
        return <div>
            <div className="book-shelf-changer">
                <select defaultValue={this.props.selectedValue} onChange={this.handleChange}>
                    {this.renderOptions()}
                </select>
            </div>
        </div>
    }
}