import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux'
import { PushNotificationWorker } from '../serviceWorkerUtility'
import { setSwNotificationCount, setSwNotification } from '../actions/serviceTypeAction'
import { Link, withRouter } from 'react-router-dom'
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class NavBar extends React.Component {
  notificationIconClick = (serviceName) => () => {
    console.log(serviceName)
    this.props.setSwNotificationCount(null)
    this.props.history.push("/Notification")
  }
  async componentDidMount() {
    if (PushNotificationWorker.check())
      this.swRegistration = await PushNotificationWorker.registerServiceWorker()
    this.handleSwPush()
  }
  handleSwPush = () => {
    const that = this
    navigator.serviceWorker.addEventListener('message', function (event) {
      console.log('Received a push notification from service worker: ', event);
      that.props.setSwNotificationCount(that.props.pushService.SW + 1)
      that.props.setSwNotification({
        type: "Message type",
        msg: event.data.text,
        time: Math.floor(Date.now())
      })
    })
  }
  render() {
    const { classes, pushService } = this.props
    const services = ["SW", "WS", "FB", "SNS"]
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Push Notifications
          </Typography>
            {services.map((service, idx) => <MenuItem onClick={this.notificationIconClick(service)} key={idx}>
              <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={pushService[service]} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <p>{service}</p>
            </MenuItem>)}
          </Toolbar>
        </AppBar>
      </div>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    pushService: state.notificationServices
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setSwNotificationCount: (count) => { dispatch(setSwNotificationCount(count)) },
    setSwNotification: (count) => { dispatch(setSwNotification(count)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(NavBar)))