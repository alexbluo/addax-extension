// reminder that to see changes, must go to chrome://extensions and click the reload button
// also make sure dev server is running...
// background script output in service worker inspect, content script output in webpage

// https://medium.com/frontendweb/how-to-add-google-adsense-in-your-nextjs-89e439f74de3
// set ins content to returned ad through content script

const parseAddax = () => {
  const addax = document.querySelector<HTMLMetaElement>("meta[name=addax]");
  const categories = addax?.content.split(" ").map((i) => parseInt(i, 10));

  return categories;
};

// cut off and query string
const parseTabUrl = (url: string) => {
  const queryStringIndex =
    url.indexOf("?") === -1 ? undefined : url.indexOf("?");

  url = url.substring(0, queryStringIndex);

  return url.trim();
};

// const injectAds = () => {};

const addax = async (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  if (changeInfo.status === "complete") {
    let err = false;
    const categories = await chrome.scripting
      .executeScript({
        target: { tabId },
        func: parseAddax,
      })
      .then((data) => data[0].result)
      .catch(() => {
        err = true;
      });

    // stop execution if addax is not enabled for the page
    if (!categories || err) return;

    const parsedUrl = parseTabUrl(tab.url!);

    // check if page has been visited, if so then don't increment interests
    const historySearch = await chrome.history.search({
      text: `"${parsedUrl}"`,
    });

    const visited = historySearch.some(
      // doesnt match for same path with query strings - massive headache, would need some regex or a genie
      (item: chrome.history.HistoryItem) => item.url === parsedUrl
    );

    console.log(visited);

    const { interests } = await chrome.storage.local.get({
      // default values for each id if no interests exist yet
      interests: Array(350)
        .fill("")
        .reduce((acc, cur, i) => ({ ...acc, [i]: 0 }), {}),
    });

    // increment local user interest profile for publishder categories
    if (!visited) {
      for (const category of categories) {
        interests[category] += 1;
      }
    }

    console.log(interests);
    // retrieve avertiser list and fetch endpoints
    // ^ might want to do before incrementing to dissuade publishers from setting to higher conversion categories

    await chrome.storage.local.set({ interests });
  }
};

chrome.tabs.onUpdated.addListener(addax);
