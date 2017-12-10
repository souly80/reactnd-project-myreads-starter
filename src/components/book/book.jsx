// @flow

import * as React from "react";
import './book.style.css';
import {BookshelfChanger} from "../bookshelf-changer/bookshelf-changer";
import type {Option} from "../bookshelf-changer/bookshelf-changer";
import SelectOption from "../model/select-options";

export type BookModel = {
    id?: string | number;
    imgPath: string;
    title: string;
    authors: string;
    bookIsMoved: Function;
    selectedValue: string;
}

export class Book extends React.PureComponent<BookModel,any> {

    options: Array<Option>;
    constructor(props: BookModel) {
        super(props)
        this.options = SelectOption();
    }

    handleBookIsMoved = (shelf: string) => {
        this.props.bookIsMoved(this.props.id,shelf);
    }

    render() {
        const styleBook = {
            width: 128,
            height: 193,
            backgroundImage: `url(${this.props.imgPath})`
        };
        return <div className="book">
            <div className="book-top">
                <div className="book-cover" style={styleBook}></div>
                <BookshelfChanger selectedValue={this.props.selectedValue} onChanged={this.handleBookIsMoved} options={this.options}/>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors}</div>
        </div>
    }
}