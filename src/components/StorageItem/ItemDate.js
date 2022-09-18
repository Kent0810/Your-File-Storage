import React from "react";

import styles from './StorageItem.module.css'
const ItemDate = (props) => {
    const month = new Date(props.date).toLocaleString('en-US', { month: 'long' });
    const date = new Date(props.date).toLocaleString('en-US', { day: '2-digit' });
    const year = new Date(props.date).getFullYear();

    return (
        <div className={styles.fileDate}>
            <div className={styles.month}>{month}</div>
            <div className={styles.date}>{date}</div>
            <div className={styles.year}>{year}</div>
        </div>
    )
}
export default ItemDate