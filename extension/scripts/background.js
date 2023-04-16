import localforage from "localforage";

// reminder that to see changes, must go to chrome://extensions and inspect service worker, also reload button...
// content script output in webpage
const parseAddax = async (tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    await localforage.setItem("interests", [
      ...((await localforage.getItem("interests")) || []),
      123,
    ]);
    const interests = await localforage.getItem("interests");
    console.log(interests);

    fetch(
      `http://localhost:5000/api/advertiser?category=${
        interests ? interests[0] : 0
      }`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    // console.log(await document.browsingTopics());
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
  }
};

chrome.tabs.onUpdated.addListener(parseAddax);
