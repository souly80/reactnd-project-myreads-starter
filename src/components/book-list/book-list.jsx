// @flow

import React from 'react';
import {Book} from "../book/book";
import type {BookModel} from "../book/book";
import {BookshelfTitle} from "../bookshelf-title/bookshelf-title";

export type BookListModel = {
    list: BookModel[];
    bookFromListIsMoved: Function;
    title: string;
    listName: string;
    selectedValue: string;
}

export class BookList extends React.Component<BookListModel,any> {

    handleBookIsMoved = (id: string, shelf: string) => {
        this.props.bookFromListIsMoved(id, shelf,this.props.list,this.props.listName);
    }

    render() {
        return <div>
            <BookshelfTitle title={this.props.title}/>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.list && this.props.list.map((book: BookModel,index: number) => {
                        return (<li key={index}>
                            <Book selectedValue={this.props.selectedValue} bookIsMoved={this.handleBookIsMoved} title={book.title}
                                    authors={book.authors}
                                    imgPath={book.imageLinks.thumbnail}
                                    id={book.id}/>
                        </li>);
                    })}
                </ol>
            </div>
        </div>
    }
}