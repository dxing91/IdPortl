import React, { Component } from 'react'

export default class AppContainer extends Component {
  render() {
    return (
      <div className='main-container'>
        <h1 className='main-container__h1'>IdPortl</h1>
        {this.props.children}
      </div>
    )
  }
}
