import React from 'react'
import { inject, observer } from 'mobx-react'
import AuthStore from '../stores/auth'
import Colors from '../Colors'

@inject('auth')
@observer
export default class Header extends React.Component<{
  auth?: AuthStore
}> {
  render() {
    return (
      <div
        style={{
          height: 70,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: Colors.offWhite,
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }}
        >
          <div
            style={{
              backgroundColor: Colors.green,
              borderRadius: 4,
              padding: 4,
              color: Colors.offWhite,
            }}
          >
            Survive With Me
          </div>
          <div
            style={{
              backgroundColor: Colors.green,
              borderRadius: 4,
              padding: 4,
              color: Colors.offWhite,
            }}
          >
            {this.props.auth.token ? 'Authenticated' : 'Not Authenticated'}
          </div>
        </div>
      </div>
    )
  }
}
