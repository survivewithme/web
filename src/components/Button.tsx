import React from 'react'
import Colors from '../Colors'

export default class Button extends React.Component<{
  style?: any
  onClick?: () => void
}> {
  render() {
    return (
      <div
        style={{
          backgroundColor: Colors.green,
          borderRadius: 4,
          padding: 4,
          color: Colors.offWhite,
          cursor: 'pointer',
          ...(this.props.style || {}),
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    )
  }
}
