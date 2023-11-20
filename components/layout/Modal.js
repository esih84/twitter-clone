"use client";
import { useCallback } from "react";
import { AiOutlineClose} from 'react-icons/ai'
import Button from "../modules/Button";
const Modal = ({
  isOpen = false,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLable,
  disabled = false,
}) => {
  const closeHandler = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [disabled]);
  const submitHandler = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled]);
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className=" 
    justify-center 
    items-center 
    flex 
    overflow-x-hidden
    overflow-y-hidden
    fixed
    inset-0
    z-50
    outline-none
    focus:outline-none
  bg-neutral-800
    bg-opacity-70 

    "
      >
        <div
          className="
         relative
         w-full
         lg:w-3/6
         my-6
         mx-auto
         lg:max-w-3xl
         h-full
         lg:h-auto
        "
        >
          {/* content */}
          <div
            className="
             h-full
             lg:h-auto
             border-0
             rounded-lg
             shadow-lg
             relative
             flex
             flex-col
             w-full
             bg-black
             outline-none
             focus:outline-none
            "
          >
            {/* header */}
            <div className="
             flex 
             items-center
             justify-between
             p-10
             rounded-t
            ">
            <h3 className =" text-3xl font-semibold text-white">{title}</h3>
            <button onClick={closeHandler} className=" p-1 ml-auto border-0 text-white hover:opacity-70 transition">
                <AiOutlineClose size={20}/>
            </button>
            </div>
            {/* body */}
            <div className=" relative p-10 flex-auto">
                {body}
            </div>
            {/* footer */}
            <div className=" flex flex-col gap-2 p-10">
                <Button 
                disabled={disabled} 
                lable={actionLable} 
                secondary 
                fullwith 
                large 
                onClick={submitHandler}/>
                {footer}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
