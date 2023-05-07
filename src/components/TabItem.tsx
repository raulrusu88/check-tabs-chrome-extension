import {truncate} from "../utils.ts";
import * as classNames from "classnames";

interface ITabItem {
    favIconUrl: string;
    title: string;
    handleClose: () => {};
    url: string;
    active: boolean;
}

const TabItem = ({ favIconUrl, title, handleClose, url, active }: ITabItem) => {
    if (url.includes("chrome://")) {
        return null;
    }

    const style = {
        default: `flex justify-between items-center h-10 mb-0.5 hover:bg-gray-900 p-2 rounded`,
    }
    const classes = classNames(
        style.default,
        { 'bg-green-600 hover:bg-green-800': active }
    );

    return (
        <div className={classes}>
            <div className="flex justify-start items-center">
                <img src={favIconUrl} alt={title} className="w-8 h-8 mr-2"/>
                <p title={title.length > 70 ? title : ""}>{truncate(title, 70)}</p>
            </div>
            <span className="cursor-pointer w-3 h-3 text-slate-100 hover:bg-red-700 rounded p-3 flex items-center justify-center" onClick={handleClose}>X</span>
        </div>
    );
}

export default TabItem;