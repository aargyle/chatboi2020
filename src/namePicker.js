import React, {useState, useRef, usefEffect, useEffect} from 'react'
import { FiEdit, FiSave } from 'react-icons/fi'

function NamePicker(props) {
    const [name, setName] = useState('')
    const [showName, setShowName] = useState(false)
    const inputEl = useRef(null)

    function save() {
        inputEl.current.focus()
        if(name) {
            props.onSave(name)
            setShowName(!showName)
            localStorage.setItem('name', name)
        }
    }

    useEffect(()=>{
        const n = localStorage.getItem('name')
        if(n) {
            setName(n)
            save()
        }
    }, [])

    return <div className='edit-username'>
        <input value={name} ref={inputEl}
            style={{display: showName ? 'none' : 'flex'}}
            onChange={e=> setName(e.target.value)}
            onKeyPress={e=> {
                if(e.key==='Enter') props.onSave(name)
            }}
        />
        
        {showName && <div>{name}</div>}
        
        <button onClick={save}>
            {showName ? <FiEdit className='header-icon' /> : <FiSave className='header-icon'/>}
        </button>
    </div>
}

export default NamePicker