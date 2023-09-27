export default async (url) => {
  const res = await fetch(url, { mode: 'cors' });
  return res.json();
};
