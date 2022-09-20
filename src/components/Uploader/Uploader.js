import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card/Card";
import Button from '../UI/Button/Button'
import PopUp from "../UI/PopUp/PopUp";
import Input from "../UI/Input/Input";
import Header from "../UI/Header/Header";


import AuthContext from "../../context/auth-context";
import { storage } from "../../config/firebase-config";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    getMetadata
} from "firebase/storage"
import { v4 } from 'uuid'
import styles from './Uploader.module.css'


const Uploader = (props) => {
    const ctx = useContext(AuthContext);

    //FORM CONTROLLER
    const [nameState, setName] = useState('');
    const [dateState, setDate] = useState('');

    //SUBMIT STATE CONTROLLER
    const [isSubmitted, setSubmitState] = useState(false);
    const [LoggedOutError, setErrorName] = useState('');
    //FILE CONTROLLER
    const [fileUpload, setFileUpload] = useState(null);
    const [fileUrl, setFileUrl] = useState([]);
    const [fileMetaData, setMetaData] = useState([]);

    //onsubmit
    const submitHandler = (event) => {
        event.preventDefault();
        if (typeof ctx.currentUser.uid === 'undefined') {
            console.log("Error Occur !")
            setSubmitState(true);
            setErrorName("You Must Be Logged In To Upload")
            return;
        }
        const fileRef = ref(storage, `files/${ctx.currentUser.uid}/${nameState + '-'}${dateState + '-' + v4()}`)

        if (fileUpload == null) return;
        uploadBytes(fileRef, fileUpload)
            .then((snapshot) => {
                getMetadata(snapshot.ref).then((metadata) => {
                    setMetaData((prev) => [...prev, metadata.name])
                })
                getDownloadURL(snapshot.ref).then((url) => {
                    setFileUrl((prev) => [...prev, url]);
                })

            })
        setErrorName('');
        setSubmitState(true);
    }
    const onReceive = props.onReceive
    useEffect(() => {
        if (typeof ctx.currentUser.uid === 'undefined') {
            setMetaData([])
            setFileUrl([])
            return;
        } else {
            const fileRef = ref(storage, `files/${ctx.currentUser.uid}`)
            listAll(fileRef)
                .then((response) => {
                    response.items.forEach((item) => {
                        getMetadata(item).then((metadata) => {
                            setMetaData((prev) => [...prev, metadata.name])
                        })
                        getDownloadURL(item).then((url) => {
                            setFileUrl((prev) => [...prev, url]);
                        })
                    })
                })
        }
    }, [ctx.currentUser.uid])

    useEffect(() => {
        onReceive(fileUrl, fileMetaData)
    }, [fileUrl, fileMetaData])


    const fileNameHandler = (e) => {
        setName(e.target.value);
    }
    const fileDateHandler = (e) => {
        setDate(e.target.value)
    }
    const NotificationHandle = () => {
        setSubmitState(false);
    }

    return (
        <Card className={styles.uploader}>
            {isSubmitted && ReactDOM.createPortal(
                <PopUp onClick={NotificationHandle} LoggedOutError={LoggedOutError} contentDescription="Upload Successfully" ></PopUp>
                , document.getElementById("popup-root"))
            }
            <Header className={styles.uploaderHeader}>Upload Your File</Header>
            <form onSubmit={submitHandler}>
                <Input id='fileName' type='text' onChange={fileNameHandler} value={nameState}>File Name</Input>
                <Input id='date' type='date' onChange={fileDateHandler} value={dateState}>Date</Input>
                <Input id='file' type='file' onChange={(event) => {
                    setFileUpload(event.target.files[0]);
                }} value={fileUpload}>File</Input>
                <div className={styles.actions}>
                    <Button className={styles.uploaderBtn} type='submut' >Submit</Button>
                </div>
            </form>
        </Card>
    )
}
export default Uploader;