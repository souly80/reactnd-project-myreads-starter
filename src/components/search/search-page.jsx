// @flow

import * as React from "react";
import {Link} from "react-router-dom";
import * as BooksAPI from '../../services/BooksAPI';
import {BookList} from "../book-list/book-list";
import {getBookByID} from "../utils/utils";


export class SearchPage extends React.PureComponent<any,any> {

    constructor(props) {
        super(props)
        this.state = { results: []};
    }

    changeHandler = (e) => {
      BooksAPI.search(e.target.value).then(results => {
        this.setState({results});
      });
    };

    handleBookFromListIsMoved = (id, shelf,list,listName) => {
        var book = getBookByID(list, id);
        BooksAPI.update(book,shelf).then(data => {
            console.log(data);
        });
    };

    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input onChange={this.changeHandler} type="text" placeholder="Search by title or author"/>
                </div>
            </div>
            <div className="bookshelf">
                <BookList selectedValue="none"
                          listName="listCurrentReading"
                          title="Search List"
                          bookFromListIsMoved={this.handleBookFromListIsMoved}
                          list={this.state.results}/>
            </div>
        </div>
    }
}