import React from "react";
import StorageItem from "../StorageItem/StorageItem";
import Card from "../UI/Card/Card";
import Header from "../UI/Header/Header"
import styles from './Storage.module.css'

const Storage = (props) => {
    return (
        <Card className={styles.storage}>
            <Header className={styles.title}>Your Storage</Header>
            {(props.items.length === 0) && <h1 className={styles.alert}>Upload Something To Our Storage !</h1>}
            {props.items.map((item) => (
                <StorageItem
                    key={item.id}
                    id={item.id}
                    fileName={item.fileName}
                    date={item.date}
                    file={item.file}
                />
            ))}
        </Card>
    )
}
export default Storage