import React from 'react'
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { AiOutlineFileExcel } from "react-icons/ai";


function Error() {
  return (
    <div>
        <AiOutlineFileExcel style={{width: "100%", height: "100"}} />
        <h2 style={{textAlign: 'center'}}>No Data</h2>
    </div>
  )
}

export default Error