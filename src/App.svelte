<script>
  import { onMount } from 'svelte';
  import { histEvents } from './historyData';
  import { getData } from './holidaysAPI.js';
  import Event from './Event.svelte';

  let events = [];
  $: console.log(events);
  
  const convertDate = (date) => {
    /* Time zone */
    let timezone = 'PST'
    let nd = new Date(`${date} ${timezone}`);

    let prettyDate = nd.toLocaleDateString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' });
    return prettyDate;
  }

  onMount(async () => events = await getData());
</script>

<main>

  <div class="timeline">
    {#each events as {name, date}, i}
      <Event {name}
             date={convertDate(date)}
             left={i % 2 === 0}
             eventID={name} />
    {/each}

  </div>

</main>

<style>

  *{
    box-sizing: border-box;
  }
  main{
    background-color: #474e5d;
    font-family: Helvetica, sans-serif;
  }
  /* vertical ruler */
  .timeline{
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }
  .timeline::after{
    content: " ";
    position: absolute;
    width: 6px;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }
  /* content container */
  .container{
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    width: 50%;
  }
  /* Circles on the timeline */
  .container::after{
    content: " ";
    position: absolute;
    width: 25px;
    height: 25px;
    right: -17px;
    background-color: white;
    border: 4px solid #FF9F55;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }
  /* Container to the left */
  .left{
    left: 0;
  }
  /* Container to the right */
  .right{
    left: 50%;
  }
  /* Arrows to the left container (pointing right) */
  .left::before{
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    right: 30px;
    border: medium solid white;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent white;
  }
  /* Arrows to the right container (pointing left) */
  .right::before{
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    left: 30px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }
  /* Fix the circle for containers on the right side */
  .right::after{
    left: -16px;
  }
  /* The actual content */
  .content{
    padding: 20px 30px;
    background-color: white;
    position: relative;
    border-radius: 6px;
  } 

  /* Responsive on the screens less than 600px wide */
  @media screen and (max-width: 600px){
    /* Place the timelime to the left */
    .timeline::after{
      left: 31px;
    }
    /* Full-width containers */
    .container{
      width: 100%;
      padding-left: 70px;
      padding-right: 25px;
    }
    /* All arrows pointing to leftwards */
    .container::before{
      left: 60px;
      border: medium solid white;
      border-width: 10px 10px 10px 0;
      border-color: transparent white transparent transparent;
    }
    /* All circles at the same spot */
    .left::after, .right::after{
      left: 15px;
    }
    /* Right containers behave like the left ones */
    .right{
      left: 0%;
    }
  }

</style>
