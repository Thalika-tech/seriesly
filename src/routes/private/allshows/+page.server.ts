export const load = async () => {
  const getAllShows = async () => {
    const res = await fetch("https://api.tvmaze.com/shows");
    const data = await res.json();
    return data;
  };

  return {
    shows: await getAllShows(),
  };
};
