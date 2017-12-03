import * as React from "react";
import './book.style.css';
import {BookshelfChanger, Option} from "../bookshelf-changer/bookshelf-changer";

export type BookPropTypes = {
    imgPath: string;
    title: string;
    authors: string;
}

export class Book extends React.PureComponent<BookPropTypes,any> {

    options: Array<Option>;
    constructor(props: BookPropTypes) {
        super(props)
        this.options = [];
        this.options.push({
            isDisabled: true,
            value: "none",
            label: "Move to..."
        });
        this.options.push({
            isDisabled: false,
            value: "currentlyReading",
            label: "Currently Reading"
        });
        this.options.push({
            isDisabled: false,
            value: "wantToRead",
            label: "Want to Read"
        });
        this.options.push({
            isDisabled: false,
            value: "read",
            label: "Read"
        });
        this.options.push({
            isDisabled: false,
            value: "none",
            label: "None"
        });
    }
    render() {
        const styleBook = {
            width: 128,
            height: 193,
            backgroundImage: this.props.imgPath
        };
        return <div className="book">
            <div className="book-top">
                <div className="book-cover" style={styleBook}></div>
                <BookshelfChanger options={this.options}/>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors}</div>
        </div>
    }
}