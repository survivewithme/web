import React from 'react'
import Colors from '../Colors'

export default class HomeColumn extends React.Component<{
  title: string
}> {
  render() {
    return (
      <div
        style={{
          minWidth: 400,
          margin: 8,
        }}
      >
        {this.props.title}
        <div
          style={{
            marginTop: 4,
            border: `1px solid ${Colors.black}`,
            borderRadius: 2,
            padding: 8,
            minHeight: 300,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}
