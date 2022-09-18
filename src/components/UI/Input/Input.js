import React, { useRef, useImperativeHandle } from "react";
import styles from './Input.module.css'

const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef()
    useImperativeHandle((ref), () => {
        return inputRef.current;
    })

    return (
        <div className={styles.control}>
            <label htmlFor={props.id}>{props.children}</label>
            <input label={props.id} id={props.id} type={props.type} ref={inputRef} required={props.isRequired} onChange={props.onChange}></input>
        </div>
    )
})
export default Input