import React from "react";
import Card from '../UI/Card/Card'
import ItemDate from "./ItemDate";
import styles from './StorageItem.module.css'
import ItemDescription from "./ItemDescription";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
const StorageItem = (props) => {
    let displayName = props.fileName
    if (displayName.length >= 8 && window.screen.availWidth < 418) {
        displayName = displayName.substring(0, 6) + "..."
    }
    const DeleteHanlder = () => {
        props.onDelete(props.fullPath, props.id)
    }
    return (
        <Card className={styles.items}>
            <ItemDate date={props.date}></ItemDate>
            <ItemDescription>
                <h3>{displayName}</h3>
                <div className={styles.downloadBtn}>
                    <a href={props.file} download rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faCloudDownload} size="2x" /></a>
                    <FontAwesomeIcon icon={faTrash} size="2x" color="red" onClick={DeleteHanlder}></FontAwesomeIcon>
                </div>
            </ItemDescription>
        </Card>
    )
}
export default StorageItem