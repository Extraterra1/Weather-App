import fetchJSON from './fetchJSON';

export default async (city) => {
  const url = `https://api.teleport.org/api/urban_areas/slug:${city}/images/`;
  const res = await fetchJSON(url);
  return res.photos[0].image.web;
};
