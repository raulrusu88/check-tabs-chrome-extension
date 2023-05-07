import {truncate} from "../utils.ts";

const TabItem = ({ favIconUrl, title, handleClose, url }: {favIconUrl: string, title: string, handleClose: () => {}, url: string}) => {
    if (url.includes("chrome://")) {
        return null;
    }

    return (
        <div className="flex justify-between items-center h-10 mb-0.5 hover:bg-gray-900 p-2 rounded">
            <div className="flex justify-start items-center">
                <img src={favIconUrl} alt={title} className="w-8 h-8 mr-2"/>
                <p title={title.length > 15 ? title : ""}>{truncate(title, 70)}</p>
            </div>
            <span className="cursor-pointer w-3 h-3 text-slate-100" onClick={handleClose}>X</span>
        </div>
    );
}

export default TabItem;