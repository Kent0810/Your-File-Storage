import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from './PopUp.module.css'
//ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Content from "./Content";

const PopUp = (props) => {
    const [isError, setErrorState] = useState(false)
    //only check once per load => no re-render error
    useEffect(() => {
        if (props.LoggedOutError.length !== 0) {
            setErrorState(true)
        }
    }, [props.LoggedOutError.length])


    return (
        //FRAMER_MOTION
        <Card className={`${styles.notification}`}>
            {isError && <FontAwesomeIcon icon={faX} size="3x" color="white" className={`${styles.notificationCheck} ${styles.red}`} />}
            {!isError && <FontAwesomeIcon icon={faCheck} size="4x" color="white" className={`${styles.notificationCheck} ${styles.green}`} />}
            <Content isError={isError} onClick={props.onClick} errorDescription={props.LoggedOutError} contentDescription={props.contentDescription} />
        </Card>
    )
}

export default PopUp;