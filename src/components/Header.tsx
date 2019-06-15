import React from 'react'
import { inject, observer } from 'mobx-react'
import AuthStore from '../stores/auth'
import Colors from '../Colors'
import Button from './Button'

@inject('auth')
@observer
export default class Header extends React.Component<{
  screenName?: string
  auth?: AuthStore
}> {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: Colors.white,
          borderBottom: `1px solid ${Colors.black}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Button style={{ margin: 8 }}>Survive With Me</Button>
            {this.props.screenName ? (
              <Button
                style={{
                  backgroundColor: Colors.black,
                  margin: 8,
                }}
              >
                {this.props.screenName}
              </Button>
            ) : null}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <Button style={{ margin: 8 }}>
              {this.props.auth.token
                ? this.props.auth._activeAuth.email
                : 'Not Authenticated'}
            </Button>
            <Button
              style={{
                backgroundColor: Colors.red,
                margin: 8,
              }}
              onClick={() => {
                this.props.auth.logout()
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
