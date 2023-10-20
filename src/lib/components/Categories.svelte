<script>
  import { tags } from "$lib/data";
  import { formatDate } from "$lib/utils";

  import { getCollection } from "astro:content";

  async function getblogs() {
    const all = await getCollection("blogs");

    return all;
  }

  let selected = "all";
</script>

<figure>
  <button
    class="chip contrast {selected != 'all' && 'outline'}"
    on:click={() => (selected = "all")}>All</button
  >
  {#each tags as tag}
    <button
      class="chip contrast {selected != tag && 'outline'}"
      on:click={() => (selected = tag)}
    >
      {tag}
    </button>
  {/each}
</figure>

{#await getblogs()}
  <article aria-busy="true">Loading blogs...</article>
{:then data}
  <div class="content">
    {#each data as { slug, data: { title, tags, publishedOn }, render }}
      {#if selected == "all" || tags.find((tag) => tag.toLowerCase() == selected.toLowerCase())}
        {#await render() then data}
          <article>
            <hgroup>
              <h5>{title}</h5>
              <h6>
                <small
                  >{formatDate(publishedOn)} &bull; {data
                    .remarkPluginFrontmatter.minutesRead}</small
                >
              </h6>
            </hgroup>
            <a href={"/post/" + slug} role="button"> Read &rarr; </a>
          </article>
        {/await}
      {/if}
    {/each}
  </div>
{/await}

<style>
  figure {
    display: flex;
    gap: var(--spacing);
  }
  figure > button {
    display: block;
    width: auto;
    flex-shrink: 0;
  }
  .content {
    display: grid;
    gap: var(--spacing);
    margin-bottom: var(--vertical-spacing, 3rem);
  }

  .content > article {
    margin-block: 0;
    padding: var(--spacing);
    display: grid;
  }

  .content > article > a {
    width: fit-content;
    justify-self: start;
    align-self: end;
  }
</style>
