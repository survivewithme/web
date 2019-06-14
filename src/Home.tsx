import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('auth')
@observer
export default class Home extends React.Component<{}> {
  render() {
    return <>authed home</>
  }
}
