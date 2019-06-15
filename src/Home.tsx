import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from './components/Header'
import { Redirect } from 'react-router'
import AuthStore from './stores/auth'
import OrganizationStore from './stores/organization'

@inject('auth', 'organization')
@observer
export default class Home extends React.Component<{
  auth: AuthStore
  organization: OrganizationStore
}> {
  async componentDidMount() {
    await this.props.organization.load()
  }

  render() {
    if (!this.props.auth.token) {
      return <Redirect to="login" />
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header />
        <div style={{ padding: 8, borderRadius: 4, border: '1px solid #000' }}>
          {this.props.organization.list.map((organization: any) => (
            <div key={organization._id}>
              <div>{organization.name}</div>
              <input
                style={{ marginRight: 8 }}
                type="text"
                readOnly
                value={organization.inviteLink}
              />
              <button
                onClick={() => {
                  const elem = document.createElement('textarea')
                  elem.value = organization.inviteLink
                  elem.setAttribute('readonly', '')
                  document.body.appendChild(elem)
                  elem.select()
                  document.execCommand('copy')
                  document.body.removeChild(elem)
                }}
              >
                Copy Link
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
