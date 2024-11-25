export const load = async ({ params }: { params: { showId: any } }) => {
  const getShowsInfo = async () => {
    const res = await fetch(`https://api.tvmaze.com/shows/${params.showId}`);
    const data = await res.json();

    const seasons = await fetch(`https://api.tvmaze.com/shows/${params.showId}/seasons`);
    const data2 = await seasons.json();

    data.seasons = data2;
    return data;
  };

  return {
    show: await getShowsInfo(),
  };
};
