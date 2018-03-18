import React, {Component} from 'react';
import {inject} from "mobx-react";

class InitForm extends Component {

    render() {
        return (
            <form action="#" onSubmit={this.handleSubmit}>
                <label>url</label>
                <input type="text" value={this.props.url} onChange={e => this.props.setUrl(e.target.value)}/>
                <label>key</label>
                <input type="text" value={this.props.key} onChange={e => this.props.setKey(e.target.value)}/>

            </form>
        )
    }

}

export default inject(stores => (
    {
        setKey: stores.apiStore.setKey,
        setUrl: stores.apiStore.setUrl,
        url: stores.apiStore.api.url,
        key: stores.apiStore.api.key
    }))(InitForm)