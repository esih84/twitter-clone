'use client'

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { useCallback } from "react";

const Header = ({lable, showBackArrow=false}) => {
    const router = useRouter()
    const handleBack =useCallback(()=>{
        router.back()
    },[router])
    return (
        <div className=" border-b border-neutral-800 p-5">
            <div className="flex flex-row items-center gap-2">
                {showBackArrow &&
                    <BiArrowBack onClick={handleBack} color="white" size={20} className=" cursor-pointer hover:opacity-70 transition"/>
                }
                <p className=" text-white text-xl font-semibold">{lable}</p>
            </div>
        </div>
    );
}

export default Header;