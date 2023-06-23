import { useState } from "react"
import Modal from "@/components/UI/Modal";
const EditChatModal = () => {
    const  [content,setContent] = useState("");
    return(
        <Modal>
            <h1>Edit Message</h1>
        </Modal>
    )

}

export default EditChatModal;