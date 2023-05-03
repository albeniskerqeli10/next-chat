import { createPortal } from "react-dom";
import {useRef,useEffect} from 'react';
import {X} from 'react-feather'
const Modal = ({title,handleClose,children}:any) => {
    const modalRef:any = useRef();

    useEffect(() => {
      const handleClickOutside = (e:any)  => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          handleClose();
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [modalRef, handleClose]);
    return createPortal(
       <div  className="w-full h-full absolute top-0 left-0 right-0 flex items-center justify-center flex-wrap bg-opacity-20 bg-black
       ">
       <div ref={modalRef} className="w-[400px] min-h-[400px] bg-neutral-950 shadow-lg rounded-md flex items-center justify-center flex-wrap flex-row  border border-neutral-800">
       <div className="w-full  flex items-center justify-between px-5 py-4 flex-row">
       <h1>{title || "Create Room"}</h1>
        <button onClick={ handleClose}><X aria-label="Close"/></button>
       </div>
       <div className="w-full flex items-center justify-center flex-col   ">
       {children}
       </div>
        </div>
       </div>
        
        ,document.querySelector("#modal-root") as Element
    )
}

export default Modal;