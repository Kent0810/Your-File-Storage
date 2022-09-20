import React, { useState } from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import Storage from "./components/Storage/Storage";

import Uploader from "./components/Uploader/Uploader";




function App() {
  const [data, setData] = useState([]);
  const onReceive = (fileUrl, fileMetaData) => {
    var arr = []
    for (var i = 0; i < fileUrl.length; i++) {
      var item = {}
      let currentFileId = `e${i}`
      let currentFileName = fileMetaData[i].slice(0, fileMetaData[i].indexOf('-'))
      let currentFileDate = fileMetaData[i].slice(fileMetaData[i].indexOf('-') + 1, fileMetaData[i].indexOf('-') + 11)
      let currentFileUrl = fileUrl[i];
      item.id = currentFileId
      item.fileName = currentFileName
      item.date = currentFileDate
      item.file = currentFileUrl
      arr.push(item)
    }
    setData(arr)
  }

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <Uploader onReceive={onReceive} ></Uploader>
        <Storage items={data}></Storage>
      </main>
    </React.Fragment>
  )
}

export default App;
