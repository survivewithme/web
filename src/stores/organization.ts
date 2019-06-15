import { observable } from 'mobx'
import axios from 'axios'
import AuthStore from './auth'

export default class OrganizationStore {
  @observable _byId: { [key: string]: any } = {}
  @observable list: any[] = []

  byId(_id: string) {
    return this._byId[_id] || {}
  }

  async load() {
    try {
      const { data } = await axios.get('/organizations/list', {
        params: {
          token: AuthStore.token,
        },
      })
      data.forEach((organization: any) => {
        this._byId[organization._id] = organization
      })
      this.list = data
    } catch (err) {
      console.log('Error loading organizations', err)
      throw err
    }
  }
}
