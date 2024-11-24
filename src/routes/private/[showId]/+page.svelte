<script lang="ts">
  import { getUserState } from '$lib/state/user-state.svelte.js';
  import { page } from '$app/stores';
  import LikeBtn from '$components/Button/LikeBtn.svelte';

  let { data } = $props(); 

  let queryParams = $page.url.searchParams;
  const path = queryParams.get('from');

  const showData = $state(data.show);

  let userContext = getUserState();
  let { userShows } = $derived(userContext);


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

  $inspect(showData)
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
   
    <p class="summary">{showData.summary.replace("<p>", "").replace("</p>", "")}</p>
    
    <!-- <p>Watch Now</p> -->

    <p class="rating">Rating: {showData.rating.average}</p>
  </div>
</div>


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
</style>