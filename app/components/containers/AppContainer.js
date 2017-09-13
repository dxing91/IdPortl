import React, { Component } from 'react'

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <h1>IdPortl</h1>
        {this.props.children}
      </div>
    )
  }
}
