import React from "react";
import Card from '../UI/Card/Card'
import ItemDate from "./ItemDate";
import styles from './StorageItem.module.css'
import ItemDescription from "./ItemDescription";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownload } from '@fortawesome/free-solid-svg-icons'

const StorageItem = (props) => {
    return (
        <Card className={styles.items}>
            <ItemDate date={props.date}></ItemDate>
            <ItemDescription>
                <h3>{props.fileName}</h3>
                <div className={styles.downloadBtn}><a href={props.file} download rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faCloudDownload} size="2x" /></a></div>
            </ItemDescription>
        </Card>
    )
}
export default StorageItem