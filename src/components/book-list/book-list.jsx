// @flow

import React from 'react';
import {Book} from "../book/book";
import type {BookModel} from "../book/book";
import {BookshelfTitle} from "../bookshelf-title/bookshelf-title";


export const BookList = ({allData, title, list, bookFromListIsMoved,listName}) => {

    var handleBookIsMoved = (id: string, shelf: string) => {
        bookFromListIsMoved(id, shelf,list,listName);
    };

    var renderBookShelf = (index, book) => {
        var shelf = getShelf(allData, book.id);
        return (<li key={index}>
            <Book selectedValue={shelf}
                  bookIsMoved={handleBookIsMoved}
                  title={book.title}
                  authors={book.authors}
                  imgPath={book.imageLinks.thumbnail}
                  id={book.id}/>
        </li>);
    };

    var getShelf = (allData, id) => {
        var shelf = "none";
        if(allData) {
            for(var i =0;i<allData.length;i++) {
                if(allData[i].id === id) {
                    shelf = allData[i].shelf;
                }
            }
        }
        return shelf;
    };

    return (<div>
        <BookshelfTitle title={title}/>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {list && list.length > 0 && list.map((book: BookModel,index: number) => {
                    return renderBookShelf(index, book);
                })}
            </ol>
        </div>
    </div>)

};