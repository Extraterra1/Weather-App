/* eslint-disable no-undef */
import fetchJSON from './fetchJSON';

export default async (city) => {
  // const url = `https://www.googleapis.com/customsearch/v1?key=${atob(GOOGLEAPIKEY)}&cx=${atob(SEARCHID)}&q=${city} city&searchType=image&imgSize=huge`;
  const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${city} city&count=1&size=large`;
  const res = await fetchJSON(url, { headers: { 'Ocp-Apim-Subscription-Key': atob(BINGKEY) } });

  // const res = await fetchJSON(url);
  return res.value[0].contentUrl;
};
