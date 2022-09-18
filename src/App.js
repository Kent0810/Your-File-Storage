import React from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import Storage from "./components/Storage/Storage";

import Uploader from "./components/Uploader/Uploader";

const Dummy_Data = [
  {
    id: 'e1',
    fileName: "File1",
    date: Date.now(),
    file: "1"
  },
  {
    id: 'e2',
    fileName: "File2",
    date: Date.now(),
    file: "2"
  },
  {
    id: 'e3',
    fileName: "File3",
    date: Date.now(),
    file: "3"
  },
  {
    id: 'e4',
    fileName: "File4",
    date: Date.now(),
    file: "4"
  },
  {
    id: 'e5',
    fileName: "File5",
    date: Date.now(),
    file: "5"
  }
]


function App() {
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <Uploader></Uploader>
        <Storage items={Dummy_Data}></Storage>
      </main>
    </React.Fragment>
  )
}

export default App;
