import React, {useContext} from 'react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext)
    const { deleteContact, setCurrent, clearCurrent } = contactContext
    const {name, _id, email, phone, type} = contact

    const removeContact = () => {
        clearCurrent()
        deleteContact(_id)
    }

    return (
        <div className='card bg-light'>
            <h3 className="text-primary text-left">
                {name}{' '} 
                <span style={{float: 'right',textTransform: 'capitalize'}} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type}</span>
            </h3>
            <ul className="list">
                {email && (<li>
                    <i className="fas fa-envelope-open"></i> {email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone"></i> {phone}
                </li>)}
            </ul>
            <p>
                <button onClick={() => setCurrent(contact)} className="btn btn-dark btn-sm" >Edit</button>
                <button onClick={removeContact} className="btn btn-danger btn-sm" >Delete</button>
            </p>
        </div>
    )
}

ContactItem.prototype = {
    contact: PropTypes.object.isRequired
}

export default ContactItem
