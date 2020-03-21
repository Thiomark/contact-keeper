import { useReducer } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import { v4 as uuidv4 } from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from '../types.js'

const AlertState = props => {
    const initialState = []

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alerts

    const setAlert = (message, type, timeout = 5000) => {
        const id = uuidv4()
        dispatch({
            type: SET_ALERT,
            payload: {message, type, id}
        })
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, timeout);
    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState

