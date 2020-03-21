import React, { useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import ContactContext from '../../context/contact/contactContext'

function Alerts() {
    const alertContext = useContext(AlertContext)
    const contactContext = useContext(ContactContext)

    const { alerts, setAlert } = alertContext
    const { requestResponse, clearResponseResponse } = contactContext

    useEffect(() => {
        if(requestResponse){
            setAlert(requestResponse.message, requestResponse.type)
            clearResponseResponse()
        }
        // eslint-disable-next-line
    }, [requestResponse])

    return (
        alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                 <i className="fas fa-info-circle"></i>{alert.message}
            </div>
        ))
    )
}

export default Alerts