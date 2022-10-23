import React, { useState, useEffect, useContext } from "react";
import StorageItem from "../StorageItem/StorageItem";
import Card from "../UI/Card/Card";
import Header from "../UI/Header/Header"
import styles from './Storage.module.css'
import Loading from "../UI/Loading/Loading";
import AuthContext from "../../context/auth-context";

import { storage } from '../../config/firebase-config'
import { ref, deleteObject } from "firebase/storage";

const Storage = (props) => {

    const [shownData, setShownData] = useState([])

    const authCtx = useContext(AuthContext)
    const dataSorting = (unSortedData) => {
        const sortedData = unSortedData.slice(0).sort((a, b) => {
            return b.date.localeCompare(a.date)
        })
        return sortedData;
    }
    useEffect(() => {
        setShownData(dataSorting(props.items))
    }, [props.items])

    const DeleteHandler = (fileUrl, fileId) => {
        const desertRef = ref(storage, `files/${authCtx.currentUser.uid}/${fileUrl}`);
        deleteObject(desertRef).then(() => {
            const unsorted = shownData.filter(data => data.id !== fileId);
            setShownData(dataSorting(unsorted))
            console.log("Deleted")
        }).catch((error) => {
            alert(error.message, "Please Try Again Later!")
        });
    }
    return (
        <Card className={styles.storage}>
            <Header className={styles.title}>Your Storage</Header>
            {(shownData.length === 0) && <Loading></Loading>}
            {(shownData.length === 0) && <h1 className={styles.alert}>Upload Something to Our Storage!</h1>}
            {shownData.map((item) => (
                <StorageItem
                    key={item.id}
                    id={item.id}
                    fileName={item.fileName}
                    fullPath={item.fullPath}
                    date={item.date}
                    file={item.file}
                    onDelete={DeleteHandler}
                />
            ))}
        </Card>
    )
}
export default Storage