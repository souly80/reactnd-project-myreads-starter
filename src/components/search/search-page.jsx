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

    componentWillMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    changeHandler = (e) => {
      BooksAPI.search(e.target.value).then(results => {
        this.setState({results});
      });
    };

    handleBookFromListIsMoved = (id, shelf,list) => {
        var book = getBookByID(list, id);
        BooksAPI.update(book,shelf).then(data => {
            console.log(data);
            BooksAPI.getAll().then(books => this.setState({books}));

        });
    };

    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input onChange={this.changeHandler} type="text" placeholder="Search by title or author"/>
                </div>
            </div>
            <div className="bookshelf">
                <BookList books={this.state.books}
                          title="Search List"
                          bookFromListIsMoved={this.handleBookFromListIsMoved}
                          list={this.state.results}/>
            </div>
        </div>
    }
}