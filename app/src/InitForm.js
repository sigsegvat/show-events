import React, {Component} from 'react';

class InitForm extends Component {

    render() {
        return (
            <form action="#" onSubmit={this.handleSubmit}>
                <label>url</label>
                <input type="text" value={this.props.api.url} onChange={e => this.props.api.url=e.target.value}/>
                <label>key</label>
                <input type="text" value={this.props.api.key} onChange={e => this.props.api.key=e.target.value}/>

            </form>
        )
    }

}

export default InitForm