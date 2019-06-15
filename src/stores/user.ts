import { observable } from 'mobx'
import axios from 'axios'

export default class UserStore {
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
