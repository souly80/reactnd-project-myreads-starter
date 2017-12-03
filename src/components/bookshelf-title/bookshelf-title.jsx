// @flow

import * as React from "react";

export type BookshelfTitlePropTypes = {
    title: string;
}

export class BookshelfTitle extends React.PureComponent<BookshelfTitlePropTypes,any> {

    render() {
        return <div>
            <h2 className="bookshelf-title">{this.props.title}</h2>
        </div>
    }
}