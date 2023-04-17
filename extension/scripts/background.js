// reminder that to see changes, must go to chrome://extensions and inspect service worker, also reload button...
// content script output in webpage

// check for addax tag in head
// if present, get site categories and add to chrome.storage
// auction stuff
// parse # of ins with addax class
// request that many ads from advertiser
// https://medium.com/frontendweb/how-to-add-google-adsense-in-your-nextjs-89e439f74de3
// set ins content to returned ad through content script
// page category validation and publisher endpoint not needed
const addax = async (tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["./parseAddax.js"],
    });

    // fetch(
    //   `http://localhost:5000/api/advertiser?category=${
    //     interests ? interests[0] : 0
    //   }`
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }
};

chrome.tabs.onUpdated.addListener(addax);
