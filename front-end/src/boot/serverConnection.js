import firebaseService from '../services/firebase'

export default ({ store, Vue }) => {
  console.log(process.env.environments.FIREBASE_CONFIG)
  const config = process.env.environments.FIREBASE_CONFIG
  firebaseService.fBInit(config)
  firebaseService.auth().onAuthStateChanged((user) => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService
}
