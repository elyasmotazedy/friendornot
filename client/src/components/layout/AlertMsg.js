import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from '@material-ui/lab/Alert';

const AlertMeg = ({alerts}) =>
    alerts !== undefined &&
    alerts.length !== null &&
    alerts.length > 0 &&
    alerts.map(alert=>(
        <Alert key={alert.id} severity={alert.alertType} >{alert.msg}</Alert>
    ))

Alert.protoTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(AlertMeg)