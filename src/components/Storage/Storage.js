import React from "react";
import StorageItem from "../StorageItem/StorageItem";
import Card from "../UI/Card/Card";
import Header from "../UI/Header/Header"
import styles from './Storage.module.css'
import Loading from "../UI/Loading/Loading";
const Storage = (props) => {
    const sortedData = props.items.slice(0).sort((a, b) => {
        return b.date.localeCompare(a.date)
    })

    return (
        <Card className={styles.storage}>
            <Header className={styles.title}>Your Storage</Header>
            {(props.items.length === 0) && <Loading></Loading>}
            {(props.items.length === 0) && <h1 className={styles.alert}>Upload Something to Our Storage!</h1>}
            {sortedData.map((item) => (
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