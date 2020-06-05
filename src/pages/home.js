import React, { Component } from 'react'
import { PushNotificationWorker } from '../worker/serviceWorkerUtility'
export default class Home extends Component {
  state = {
    text: 'here we will get push message'
  }
  // async componentDidMount() {
  //   if (PushNotificationWorker.check())
  //     this.swRegistration = await PushNotificationWorker.registerServiceWorker()
  //   this.handlePush()
  // }
  // handlePush = () => {
  //   const that = this
  //   navigator.serviceWorker.addEventListener('message', function (event) {
  //     console.log('Received a push notification from service worker: ', event);
  //     console.log(that.setState({ text: event.data.text }))
  //     // return event
  //   })
  // }
  handlePermission = () => {
    const permission = PushNotificationWorker.requestNotificationPermission()
    PushNotificationWorker.showLocalNotification('This is title', 'this is the message', this.swRegistration);
  }
  render() {
    return (
      <div>
        <button id="permission-btn" onClick={this.handlePermission}>Ask Permission</button>
        <br />
        <p>{this.state.text}</p>
      </div>
    )
  }
}
