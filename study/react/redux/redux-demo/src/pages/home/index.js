import React, { Component } from 'react'
import store from '../../redux/store';
import action, { sendAction } from '../../redux/action';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            value: 'm'
        }
    }
    handleClick = () => {
        const action = sendAction();
        store.dispatch(action);

    }
    componentDidMount() {
        store.subscribe(() => {
            console.log(store.getState())
            this.setState({})
        });
        
    }

    render() {
        return (
            <div>
                <div>{this.state.value}</div>
                <button onClick={this.handleClick}>点我发送action</button>
            </div>
        )
    }
}
