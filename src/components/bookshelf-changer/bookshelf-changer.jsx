// @flow

import * as React from "react";
import './bookshelf-changer.style.css';

export type BookshelfChangerPropTypes = {
    options: Array<Option>;
}

export type Option = {
    value: string;
    label: string;
    isDisabled: boolean;
}

export class BookshelfChanger extends React.PureComponent<BookshelfChangerPropTypes,any> {

    renderOptions() {
        const{options} = this.props;
        let retValues: any[] = [];
        options.map((option: Option, index: number) => {
            retValues.push(<option key={index} value={option.value} disabled={option.isDisabled}>{option.label}</option>);
        });
        return retValues;
    }

    render() {
        return <div>
            <div className="book-shelf-changer">
                <select>
                    {this.renderOptions()}
                </select>
            </div>
        </div>
    }
}