// @flow

import React from 'react';
import {Book} from "../book/book";
import type {BookModel} from "../book/book";

export type BookListModel = {
    list: BookModel[];
}

export class BookList extends React.Component<BookListModel,any> {

    render() {
        return <div className="bookshelf-books">
            <ol className="books-grid">
                {this.props.list && this.props.list.map((book: BookModel,index: number) => {
                    return (<li key={index}>
                        <Book title={book.title}
                                authors={book.authors}
                                imgPath={book.imageLinks.thumbnail}
                                id={book.id}/>
                    </li>);
                })}
            </ol>
        </div>
    }
}