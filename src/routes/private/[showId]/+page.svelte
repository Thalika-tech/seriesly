<script lang="ts">
  import { getUserState } from '$lib/state/user-state.svelte.js';
  import { page } from '$app/stores';
  import LikeBtn from '$components/Button/LikeBtn.svelte';

  let { data } = $props(); 

  let queryParams = $page.url.searchParams;
  const path = queryParams.get('from');

  let showData = $state(data.show);
  let selectedSeason = $state({
    season: 0, episodes: [] as any[], 
  });


  let userContext = getUserState();
  let { userShows } = $derived(userContext);

  $effect(() => {
    loadEpisodes(showData.seasons[0].id)  
  })


  $effect(() => {
    let isUpdated = false;

    userShows.map((userShow) => {
      if (userShow.show_id == showData.id) {
        showData.fav = true; 
        isUpdated = true;
      }
    });

    if (!isUpdated) {
      showData.fav = false;
		}
	})

  async function loadEpisodes(seasonId: string) {
    try {
      const response = await fetch(`https://api.tvmaze.com/seasons/${seasonId}/episodes`);
      if (!response.ok) {
          throw new Error(`Failed to fetch episodes: ${response.statusText}`);
      }
      const data = await response.json();

      selectedSeason = {...selectedSeason, episodes: data}
    } catch (error) {
      console.error("Error loading episodes:", error);
    }
  }

</script>


<div class="container" style="margin-bottom: 24px">
  <a href="/private/{path}">{path === "allshows" ? "All Shows" : path === "myshows" && "My Shows"} /</a>
  <p style="font-weight: bold">&nbsp;{showData.name}</p>
</div>

<div class="container">
  <img src={showData.image.original} alt="show"/>

  <div>
    <div class="container">
      <h1 class="title">{showData.name}</h1>
      <LikeBtn condition={showData.fav} show={showData} size="32"/>
    </div>
   
    <p class="summary">{showData.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}</p>

    <p class="rating">Rating: {showData.rating.average} / 10</p>

    <!-- <p>Watch Now</p> -->
    <!-- Find providers api -->
  </div>
</div>

<div class="container">
  {#each showData.seasons as season, index}
    <button onclick={() => {selectedSeason.season = index;  loadEpisodes(season.id)}} class="season" class:selectedSeason={selectedSeason.season === index}>S{season.number < 10 ? `0${season.number}` : season.number }</button>
  {/each}
</div>

<table>
  <thead>
    <tr>
      <!-- <th>Watched</th> -->
      <th>Episode</th>
      <th style="text-align: left">Name</th>
    </tr>
  </thead>
  <tbody>
    {#each selectedSeason.episodes as epi}
      <tr>
        <!-- <th>checkbox here</th> -->
        <td style="text-align: center; width: 100px">{epi.number}</td>
        <td>{epi.name}</td>
      </tr>
    {/each}
  </tbody>
</table>


<style>
  img{
    width: 25vw;
    margin-right: 4vw;
  }

  .container{
    display: flex;
  }

  .title{
    font-size: 48px;
    margin-right: auto;
  }

  .summary{
    margin: 24px 0px;
    font-size: 20px;
  }

  .rating{
    font-size: 24px;
  }

  .season{
    margin: 32px 24px 24px 0px;
    font-size: 18px;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }

  .selectedSeason{
    font-weight: bold;
  }

  table {
    border-spacing: 0px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden; 
    border-collapse: separate; 
  }

  table th, table td {
    padding: 8px 24px;
  }

  thead {
    background-color: #3D3D40;
    border-radius: 12px;
  }

  td {
    background-color: #2A2A2D;
    border-bottom: 1px solid #3D3D40;
  }
</style>