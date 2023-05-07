/* global chrome */
import {useCallback, useEffect, useState} from 'react';
import './App.css'
import TabItem from "./components/TabItem.tsx";

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
    <div className="w-[550px]">
      <h2 className="text-amber-400 text-2xl mb-3.5">Opened Tabs</h2>
      {windows && windows.tabs.map((tab: TabType) => (
          <TabItem
              key={tab.id}
              favIconUrl={tab.favIconUrl}
              title={tab.title}
              handleClose={() => handleClose(tab.id)}
              url={tab.url}
              active={tab.active}
          />
      ))}
    </div>
  )
}

export default App;
