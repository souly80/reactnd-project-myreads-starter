// @flow

import * as React from "react";
import {Menu} from "../menu/Menu";
import {BookList} from "../book-list/book-list";
import * as BooksAPI from '../../services/BooksAPI';

export type BookListModel = {
    title: string;
    list: Array;
}

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

    handleBookFromListIsMoved = (id, shelf,list,listName) => {
        var item = this.removeBook(id,shelf,list,listName);
        this.addBook(item,shelf);
    }

    getBookByID = (list,id: string) => {
        var result = null;
        if(list) {
             list.some(item => {
                if (item.id === id) {
                    result = item;
                }
            });
        }
        return result;
    }

    removeBook = (id, shelf,list,listName) => {
        var item = null;
        if (shelf === 'read')
            item = this.getBookByID(list, id);
        else if (shelf === 'wantToRead')
            item = this.getBookByID(list, id);
        else if (shelf === 'currentlyReading')
            item = this.getBookByID(list, id);
        if (item) {
            list = list.filter(lItem => {
                return lItem !== item;
            });
            if(listName === "listCurrentReading")
                this.setState({listCurrentReading: list});
            else if(listName === "listWantToRead")
                this.setState({listWantToRead: list});
            else if(listName === "listRead")
                this.setState({listRead: list});
        }
        return item;
    }

    addBook = (book, shelf) => {
        if(shelf === 'read') {
            this.state.listRead.push(book);
            this.setState({listRead: this.state.listRead});
        }
        else if (shelf === 'wantToRead') {
            this.state.listWantToRead.push(book);
            this.setState({listWantToRead: this.state.listWantToRead});
        }
        else if (shelf === 'currentlyReading') {
            this.state.listCurrentReading.push(book);
            this.setState({listCurrentReading: this.state.listCurrentReading});
        }
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
                                <BookList selectedValue="currentlyReading" listName="listCurrentReading" title="Currently Reading" bookFromListIsMoved={this.handleBookFromListIsMoved} list={this.state.listCurrentReading}/>
                            </div>
                            <div className="bookshelf">
                                <BookList selectedValue="wantToRead" listName="listWantToRead" title="Want to Read" bookFromListIsMoved={this.handleBookFromListIsMoved}  list={this.state.listWantToRead}/>
                            </div>
                            <div className="bookshelf">
                                <BookList selectedValue="read" listName="listRead" title="Read" bookFromListIsMoved={this.handleBookFromListIsMoved}  list={this.state.listRead}/>
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