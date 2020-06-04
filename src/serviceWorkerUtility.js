const check = () => {
  if (!('serviceWorker' in navigator)) {
    console.error('No Service Worker support!')
    return false
  }
  if (!('PushManager' in window)) {
    console.error('No Push API Support!')
    return false
  }
  console.log("Service worker is supported in your browser!")
  return true
}

const registerServiceWorker = async () => {
  let registered = await navigator.serviceWorker.register('service-worker-push.js')
  registered.active ? (
    console.log("Service worker regisered!", registered)
  ) : registered = false
  return registered
}

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  console.log("Permission ", permission)
  if (permission !== 'granted') {
    console.error('Permission not granted for Notification');
  }
  return permission
}

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    // here you can add more properties like icon, image, vibrate, etc.
  }
  if (requestNotificationPermission()=== 'granted') {
    swRegistration.showNotification(title, options)
  }
}

const pushMessageReceived = () => {
  navigator.serviceWorker.addEventListener('message', function (event) {
    console.log('Received a push notification from service worker: ', event);
    return event
  })
}
export const PushNotificationWorker = {
  check,
  registerServiceWorker,
  requestNotificationPermission,
  showLocalNotification,
  pushMessageReceived
}