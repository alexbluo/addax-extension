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

const getTopInterests = (obj: { [key: string]: number }, n: number) => {
  const sortedEntries = Object.entries(obj).sort((a: any, b: any) => {
    return b[1] - a[1];
  });

  const last = sortedEntries[n - 1][1];
  const result = sortedEntries.filter((entry: any) => {
    return entry[1] >= last;
  });

  return Object.keys(Object.fromEntries(result));
};

const injectAds = (href: string) => {
  console.log(href);
};

const addax = async (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  if (changeInfo.status === "complete") {
    let err = false;
    const pageCategories = await chrome.scripting
      .executeScript({
        target: { tabId },
        func: parseAddax,
      })
      .then((data) => data[0].result)
      .catch(() => {
        err = true;
      });

    // stop execution if addax is not enabled for the page
    if (!pageCategories || err) return;

    const { interests } = await chrome.storage.local.get({
      // default values for each id if no interests exist yet
      interests: Array.from({ length: 349 }, (_, i) => i + 1).reduce(
        (acc, cur, i) => ({ ...acc, [i]: 0 }),
        {}
      ),
    });

    const n = 5;
    const topInterests = getTopInterests(interests, n);
    console.log(topInterests)
    const randomInterest = topInterests[Math.floor(Math.random() * n)];
    console.log(randomInterest)

    // get list of advertisers
    const { data: advertisers } = await fetch(
      `http://localhost:5000/api/advertiser/getAdvertisers?category=${randomInterest}`
    ).then((res) => res.json());

    console.log(advertisers);

    // generate uuid and post each advertiser to run auction

    await chrome.scripting.executeScript({
      target: { tabId },
      func: injectAds,
      args: ["lol"],
    });

    const parsedUrl = parseTabUrl(tab.url!);

    // check if page has been visited in the past 24 hours (default)
    const historySearch = await chrome.history.search({
      text: `"${parsedUrl}"`,
    });

    const visited = historySearch.some(
      // doesnt match for same path with query strings - massive headache, would need some regex or a genie
      (item: chrome.history.HistoryItem) => item.url === parsedUrl
    );

    if (!visited) {
      // increment local user interest profile for publishder categories
      for (const category of pageCategories) {
        interests[category] += 1;
      }
    }

    await chrome.storage.local.set({ interests });
  }
};

chrome.tabs.onUpdated.addListener(addax);
