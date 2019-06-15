import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from './components/Header'
import { Redirect } from 'react-router'
import AuthStore from './stores/auth'
import OrganizationStore from './stores/organization'
import Colors from './Colors'
import SignupTextInput from './components/SignupTextInput'
import HomeColumn from './components/HomeColumn'
import Button from './components/Button'

@inject('auth', 'organization')
@observer
export default class Admin extends React.Component<{
  auth: AuthStore
  organization: OrganizationStore
}> {
  state = {
    copyTextById: {} as any,
  }

  async componentDidMount() {
    await this.props.organization.load()
  }

  render() {
    if (!this.props.auth.token) {
      return <Redirect to="login" />
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <Header screenName="Admin Panel" />
        <div
          style={{
            padding: 8,
            borderRadius: 4,
            justifyContent: 'space-around',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <HomeColumn title="Organizations">
            {this.props.organization.list.map((organization: any) => (
              <div
                key={organization._id}
                style={{
                  borderBottom: `1px solid ${Colors.black}`,
                  padding: 8,
                }}
              >
                <div>{organization.name}</div>
                <div style={{ display: 'flex' }}>
                  <SignupTextInput
                    style={{ color: Colors.black, marginRight: 8 }}
                    type="text"
                    readOnly
                    value={organization.inviteLink}
                  />
                  <div style={{ alignSelf: 'center' }}>
                    <Button
                      onClick={() => {
                        const elem = document.createElement('textarea')
                        elem.value = organization.inviteLink
                        elem.setAttribute('readonly', '')
                        document.body.appendChild(elem)
                        elem.select()
                        document.execCommand('copy')
                        document.body.removeChild(elem)
                        this.setState({
                          copyTextById: {
                            ...this.state.copyTextById,
                            [organization._id]: 'Copied',
                          },
                        })
                        setTimeout(() => {
                          this.setState({
                            copyTextById: {
                              ...this.state.copyTextById,
                              [organization._id]: '',
                            },
                          })
                        }, 2000)
                      }}
                    >
                      {this.state.copyTextById[organization._id] ||
                        'Copy Signup Link'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </HomeColumn>
          <HomeColumn title="Admins"></HomeColumn>
          <HomeColumn title="Coaches"></HomeColumn>
          <HomeColumn title="Patients"></HomeColumn>
        </div>
      </div>
    )
  }
}
