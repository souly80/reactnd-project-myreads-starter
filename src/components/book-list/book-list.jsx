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

export const BookList = ({title, list, selectedValue, bookFromListIsMoved,listName}) => {

    var handleBookIsMoved = (id: string, shelf: string) => {
        bookFromListIsMoved(id, shelf,list,listName);
    };
    return (<div>
        <BookshelfTitle title={title}/>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {list && list.length > 0 && list.map((book: BookModel,index: number) => {
                    return (<li key={index}>
                        <Book selectedValue={selectedValue} bookIsMoved={handleBookIsMoved} title={book.title}
                                authors={book.authors}
                                imgPath={book.imageLinks.thumbnail}
                                id={book.id}/>
                    </li>);
                })}
            </ol>
        </div>
    </div>)

};