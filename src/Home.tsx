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
export default class Home extends React.Component<{
  auth: AuthStore
  organization: OrganizationStore
}> {
  state = {
    copyText: 'Copy Signup Link',
  }

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
                  borderRadius: 4,
                  border: `1px solid ${Colors.black}`,
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
                        this.setState({ copyText: 'Copied!' })
                        setTimeout(() => {
                          this.setState({ copyText: 'Copy Signup Link' })
                        }, 2000)
                      }}
                    >
                      {this.state.copyText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </HomeColumn>
          <HomeColumn title="Patients"></HomeColumn>
          <HomeColumn title="Coaches"></HomeColumn>
        </div>
      </div>
    )
  }
}
