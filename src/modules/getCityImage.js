/* eslint-disable no-undef */
import fetchJSON from './fetchJSON';

export default async (city) => {
  const url = `https://www.googleapis.com/customsearch/v1?key=${atob(GOOGLEAPIKEY)}&cx=${atob(SEARCHID)}&q=${city} city&searchType=image&imgSize=huge`;
  const res = await fetchJSON(url);
  return res.items[0].link;
};
