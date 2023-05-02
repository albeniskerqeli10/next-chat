import SpinnerIcon from "@/components/Icons/SpinnerIcon";
import { Loader } from "react-feather"

const loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <SpinnerIcon/>
        </div>
    )
}

export default loading;