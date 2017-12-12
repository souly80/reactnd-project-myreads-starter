// @flow

import * as React from "react";
import {Menu} from "../menu/Menu";
import {BookList} from "../book-list/book-list";
import * as BooksAPI from '../../services/BooksAPI';
import {Link} from "react-router-dom";
import {getBookByID} from "../utils/utils";

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

    removeBook = (id, shelf,list,listName) => {
        var item = null;
        if (shelf === 'read')
            item = getBookByID(list, id);
        else if (shelf === 'wantToRead')
            item = getBookByID(list, id);
        else if (shelf === 'currentlyReading')
            item = getBookByID(list, id);
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
            BooksAPI.update(book,shelf).then(data => {
                console.log(data);
            });
            this.setState({listRead: this.state.listRead});
        }
        else if (shelf === 'wantToRead') {
            this.state.listWantToRead.push(book);
            BooksAPI.update(book,shelf).then(data => {
                console.log(data);
            });
            this.setState({listWantToRead: this.state.listWantToRead});
        }
        else if (shelf === 'currentlyReading') {
            this.state.listCurrentReading.push(book);
            BooksAPI.update(book,shelf).then(data => {
                console.log(data);
            });
            this.setState({listCurrentReading: this.state.listCurrentReading});
        }
    }

    render() {
        return <div className="list-books">
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
                <Link to="/search">Close</Link>
            </div>
        </div>
    }
}