import React from "react";
import Card from '../UI/Card/Card'
import ItemDate from "./ItemDate";
import styles from './StorageItem.module.css'
import DownloadBtn from '../../assets/cloud-computing.png'
import ItemDescription from "./ItemDescription";


const StorageItem = (props) => {
    return (
        <Card className={styles.items}>
            <ItemDate date={props.date}></ItemDate>
            <ItemDescription>
                <h3>{props.fileName.toUpperCase()}</h3>
                <div className={styles.downloadBtn}><img src={DownloadBtn} alt="fireSpot" /></div>
            </ItemDescription>
        </Card>
    )
}
export default StorageItem