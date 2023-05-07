/* global chrome */
import {useCallback, useEffect, useState} from 'react';
import './App.css'

type WindowType = {
  id: number;
  incognito: boolean;
  focused: boolean;
}

type TabType = {
  active: boolean;
  audible: boolean;
  autoDiscardable: boolean;
  discarded: boolean;
  favIconUrl: string;
  groupId: number;
  id: number;
  pinned: boolean;
  selected: boolean;
  status: string;
  title: string;
  url: string;
  windowId: number;
}

const truncate = (string: string, num: number) => (num > string.length) ? string : `${string.substring(0, num)}...`

const TabItem = ({ favIconUrl, title, handleClose, url }: {favIconUrl: string, title: string, handleClose: () => {}, url: string}) => {
  if (url.includes("chrome://")) {
    return null;
  }

  return (
      <div className="flex justify-between items-center h-10 mb-0.5 hover:bg-gray-900 p-2 rounded">
        <div className="flex justify-start items-center">
          <img src={favIconUrl} alt={title} className="w-8 h-8 mr-2" />
          <p title={title.length > 15 ? title : ""} >{truncate(title, 70)}</p>
        </div>
        <span className="cursor-pointer w-3 h-3 text-slate-100" onClick={handleClose}>X</span>
      </div>
  )
}

function App() {
  const [windows, setWindows] = useState<Record<string, any>>();

  const getTabs = async () => {
    // @ts-expect-error Exclude
    const getWindows = await chrome.windows.getAll()
    // @ts-expect-error Exclude
    const getCurrentTab = await chrome.windows.getCurrent();
    getWindows.map(async (window: WindowType) => {
      // @ts-expect-error Exclude
      await chrome.tabs.query({ windowId: getCurrentTab.id}, (tabs: TabType[]) => {
        console.log(tabs);
        setWindows({
          windowId: window.id,
          tabs: [...tabs]
        })
      });
    });
  }

  const handleClose = useCallback((tabId: number) => {
    // @ts-expect-error Exclude
    return chrome.tabs.remove(tabId)
  }, [windows]);

  useEffect(() => {
    void getTabs();
  }, [])

  return (
    <div className="w-[500px]">
      <h2 className="text-amber-400 text-2xl mb-3.5">Opened Tabs</h2>
      {windows && windows.tabs.map((tab: TabType) => (
          <TabItem key={tab.id} favIconUrl={tab.favIconUrl} title={tab.title} handleClose={() => handleClose(tab.id)} url={tab.url} />
      ))}
    </div>
  )
}

export default App;
