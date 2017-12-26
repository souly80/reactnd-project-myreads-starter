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
            books: [],
            showSearchPage: false
        };
    }

    componentWillMount() {
        BooksAPI.getAll().then((books) => {
            const listWantToRead = books.filter(book => book.shelf === 'wantToRead');
            const listCurrentReading = books.filter(book => book.shelf === 'currentlyReading');
            const listRead = books.filter(book => book.shelf === 'read');
            this.setState({listCurrentReading,listWantToRead,listRead, books});
        });
    }

    handleBookFromListIsMoved = (id, shelf,list,listName) => {
        var item = this.removeBook(id,shelf,list,listName);
        this.addBook(item,shelf);
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    removeBook = (id, shelf,list,listName) => {
        var item = getBookByID(list, id);
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
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                book.shelf = shelf

                // Filter out the book and append it to the end of the list
                // so it appears at the end of whatever shelf it was added to.
                this.setState(state => ({
                    books: state.books.filter(b => b.id !== book.id).concat([book])
                }))
            })
        }
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
        else {
            BooksAPI.update(book,shelf).then(data => {
                console.log(data);
            });
        }
    }

    render() {
        return <div className="list-books">
            <Menu  title={'MyReads'}/>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <BookList books={this.state.books} listName="listCurrentReading" title="Currently Reading" bookFromListIsMoved={this.handleBookFromListIsMoved} list={this.state.listCurrentReading}/>
                    </div>
                    <div className="bookshelf">
                        <BookList books={this.state.books} listName="listWantToRead" title="Want to Read" bookFromListIsMoved={this.handleBookFromListIsMoved}  list={this.state.listWantToRead}/>
                    </div>
                    <div className="bookshelf">
                        <BookList  books={this.state.books} listName="listRead" title="Read" bookFromListIsMoved={this.handleBookFromListIsMoved}  list={this.state.listRead}/>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Close</Link>
            </div>
        </div>
    }
}