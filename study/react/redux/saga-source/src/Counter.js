import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from './store/actions';
class Counter extends Component {

  render() {
    return (
      <div>
         <p>{this.props.number}</p>
         <button onClick={this.props.add}>+</button>

         <p>我是异步的{this.props.number}</p>
         <button onClick={this.props.asyncAdd}>异步++</button>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  actions
)(Counter);
