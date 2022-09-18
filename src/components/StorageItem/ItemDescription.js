import React from "react";

import styles from './StorageItem.module.css'

const ItemDescription = props => {
    return (
        <div className={styles.description}>{props.children}</div>
    )
}
export default ItemDescription