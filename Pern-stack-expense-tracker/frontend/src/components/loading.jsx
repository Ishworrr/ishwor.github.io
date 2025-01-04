import React from "react"
import { FaSpinner } from "react-icons/fa"

const Loading=()=>{
    return(
    <div className="w-full flex items-center justify-center py-2">
        <FaSpinner className="animate-spin size={28} text-violet-600" />
    </div>
)
}

export default Loading