export const load = async ({ params }: { params: { showId: any } }) => {
  const getShowsInfo = async () => {
    const res = await fetch(`https://api.tvmaze.com/shows/${params.showId}`);

    const data = await res.json();
    return data;
  };

  return {
    show: await getShowsInfo(),
  };
};
