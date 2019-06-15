import { observable } from 'mobx'
import axios from 'axios'
import AuthStore from './auth'

export default class UserStore {
  @observable adminList: any[] = []
  async loadAdmins() {
    try {
      const { data } = await axios.get('/users/admins', {
        params: { token: AuthStore.token },
      })
      this.adminList = data
    } catch (err) {
      console.log('Error loading users', err)
      throw err
    }
  }
  async parseSignupToken(token: string) {
    try {
      const { data } = await axios.get('/users/invite/parse', {
        params: { token },
      })
      return data
    } catch (err) {
      console.log('Error parsing signup token', err)
      throw err
    }
  }
}
