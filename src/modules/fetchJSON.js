export default async (url) => {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (res.ok) return res.json();
    throw new Error('City not found');
  } catch (err) {
    console.log(err.message);
  }
};
