import React, {useContext, useRef, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext)
    const {clearContact, filterContact, filtered} = contactContext
    const text = useRef(null)

    useEffect(() => {
        if(filtered === null){
            text.current.value = ''
        }
    })

    const onchange = (e) => {
        if(text.current.value === ''){
            clearContact()
        }else{
            filterContact(e.target.value)
        }
    }

    return (
        <form>
            <input 
                ref={text} 
                type="text" 
                placeholder="Filter Contacts..."
                onChange={onchange}
                />
        </form>
    )
}

export default ContactFilter
