import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import {SearchPage} from "./components/search/search-page";
import {MainApp} from "./components/main/main-app";
import './App.css'

class App extends Component {

    render() {
        return (
            <div>
                <Route exact path='/' component={MainApp}/>
                <Route path='/search' component={SearchPage}/>
            </div>
        )
    }
}

export default App;
