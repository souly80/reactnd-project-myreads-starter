// @flow

import * as React from "react";
import './styles.css';

export type MenuProps = {
    title: string;
}

export class Menu extends React.Component<MenuProps,any> {

    render() {
        return <div className="list-books-title">
            <h1>{this.props.title}</h1>
        </div>
    }
}