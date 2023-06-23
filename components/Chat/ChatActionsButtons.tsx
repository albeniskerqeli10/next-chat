import { Edit2, Trash2 as Trash } from "react-feather";
const ChatActionsButtons = ({handleEdit, handleDelete}:any) => {
    return (
        <div className="w-full flex items-center justify-start flex-col flex-wrap ">
            <button onClick={handleEdit} className="w-full px-2 py-2 hover:bg-gradient-to-r from-[#1170FF] to-[#002DFF] hover:transition-all flex flex-row  gap-2 justify-start items-center"><Edit2 size="16"/>Edit</button>

            <button onClick={handleDelete} className="w-full py-2 flex flex-row  gap-2 px-2 hover:bg-gradient-to-r from-[#1170FF] to-[#002DFF] hover:transition-all justify-start items-center"><Trash size="16"/> Delete</button>

        </div>
    )
}

export default ChatActionsButtons