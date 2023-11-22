import { useDropzone } from "react-dropzone";
import {useCallback, useState} from 'react'
import Image from "next/image";

const ImageUpload = ({ lable, value, disabled = false, onChange }) => {
    
    const [base64, setBase64] = useState(value)
    console.log(base64)
    const changeHandler = useCallback((base64)=>{
        onChange(base64)
    },[onChange])

    const dropHandler = useCallback((files)=>{
        const file = files[0]
        const reader = new FileReader()

        reader.onload = (e)=>{
            setBase64(e.target.result)
            changeHandler(e.target.result)
        }

        reader.readAsDataURL(file)
    },[changeHandler,base64])

    const {getRootProps, getInputProps} = useDropzone({ 
        maxFiles: 1 ,
        onDrop:dropHandler,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/svg': [],
        }
    })
        return (
        <div {...getRootProps({
            className : " w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700"
        })}>
            <input {...getInputProps()} />
            {/* {
                base64 ? (
                    <div className=" flex items-center justify-center">
                    <image 
                     src={base64}
                     hieght ="100"
                     width = "100"
                     alt = "uploading image"
                    onError = {setBase64("/images/next.svg")}
                    
                    />

                    </div>
                ):null

                } */}
                <p className="text-white">{lable}</p>

        </div>
    );
}

export default ImageUpload;