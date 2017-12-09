// @flow

import * as React from "react";

import {Menu} from "../menu/Menu";
import {BookshelfTitle} from "../bookshelf-title/bookshelf-title";
import {Book} from "../book/book";
import {BookList} from "../book-list/book-list";
import * as BooksAPI from '../../services/BooksAPI';

export class MainApp extends React.PureComponent<BookModel,any> {

    constructor(props) {
        super(props)
        this.state = {
            listCurrentReading: [],
            listWantToRead: [],
            listRead: [],
            /**
             * TODO: Instead of using this state variable to keep track of which page
             * we're on, use the URL in the browser's address bar. This will ensure that
             * users can use the browser's back and forward buttons to navigate between
             * pages, as well as provide a good URL they can bookmark and share.
             */
            showSearchPage: false
        };
    }

    componentDidMount() {
        BooksAPI.getAll().then((allData) => {
            console.log(allData);
            var listCurrentReading = [];
            var listWantToRead = [];
            var listRead = [];
            allData.forEach(data => {
                if(data.shelf === 'read') {
                    listRead.push(data);
                }
                else if (data.shelf === 'wantToRead') {
                    listWantToRead.push(data);
                }
                else if (data.shelf === 'currentlyReading') {
                    listCurrentReading.push(data);
                }
            });
            this.setState({listCurrentReading,listWantToRead,listRead});
        });
    }

    render() {
        return (<div className="app">
            {this.state.showSearchPage ? (
                <div className="search-books">
                    <div className="search-books-bar">
                        <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                        <div className="search-books-input-wrapper">
                            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                            <input type="text" placeholder="Search by title or author"/>

                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                    </div>
                </div>
            ) : (
                <div className="list-books">
                    <Menu  title={'MyReads'}/>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <BookshelfTitle title="Currently Reading"/>
                                <BookList list={this.state.listCurrentReading}/>
                            </div>
                            <div className="bookshelf">
                                <BookshelfTitle title="Want to Read"/>
                                <BookList list={this.state.listWantToRead}/>
                            </div>
                            <div className="bookshelf">
                                <BookshelfTitle title="Read"/>
                                <BookList list={this.state.listRead}/>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                    </div>
                </div>
            )}
        </div>)
    }
}