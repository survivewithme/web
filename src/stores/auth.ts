import { observable } from 'mobx'
import axios from 'axios'

interface User {}

interface Auth extends User {
  token: string
}

export default class AuthStore {
  @observable
  _activeAuth?: Auth

  loadAuth() {
    const authString = localStorage.getItem('auth')
    if (!authString) return
    const auth = JSON.parse(authString) as Auth
    this._activeAuth = auth
  }

  storeAuth(auth?: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth))
    this._activeAuth = auth
  }

  get token(): string {
    if (!this._activeAuth) {
      this.loadAuth()
    }
    return this._activeAuth && this._activeAuth.token
  }

  static get token() {
    const authString = localStorage.getItem('auth')
    if (!authString) throw new Error('Unable to access token when unauthenticated')
    const auth = JSON.parse(authString) as Auth
    return auth.token
  }

  logout() {
    localStorage.removeItem('auth')
    this._activeAuth = undefined
  }

  async parseInviteToken(token: string) {
    try {
      const { data } = await axios.get('/users/invite/parse', {
        params: { token },
      })
      return data
    } catch (err) {
      console.log('Error parsing invite token', err)
      throw err
    }
  }

  async createUser(user: {
    password: string
    firstname: string
    lastname: string
    email: string
    token: string
    organizationId?: string
  }) {
    try {
      const { data } = await axios.post('/users', user)
      this.storeAuth(data)
    } catch (err) {
      const { message } = err.response && err.response.data
      console.log('Error creating user:', message)
      throw new Error(message)
    }
  }

  async login(auth: { email: string; password: string }) {
    try {
      const { data } = await axios.post('/users/login', auth)
      this.storeAuth(data)
    } catch (err) {
      console.log('Error logging in', err)
      throw err
    }
  }
}
