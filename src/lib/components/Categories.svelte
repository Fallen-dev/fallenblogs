<script>
  import { tags } from "$lib/data";
  import { formatDate } from "$lib/utils";

  import { getCollection } from "astro:content";
  import { fade, fly, slide } from "svelte/transition";

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
  <article aria-busy="true" data-unset>Loading blogs...</article>
{:then data}
  {#key selected}
    <div
      id="content"
      in:fade={{ duration: 200, delay: 200 }}
      out:fade={{ duration: 200 }}
    >
      {#each data as { slug, data: { title, tags, publishedOn, image } }}
        {#if selected == "all" || tags.find((tag) => tag.toLowerCase() == selected.toLowerCase())}
          <article>
            <div>
              <img
                src={image ? image : "/images/placeholder.webp"}
                alt="Poster of the post"
                height="200"
                width="400"
                loading="lazy"
              />
            </div>

            <hgroup>
              <h5>{title}</h5>
              <h6>
                <small>{formatDate(publishedOn)}</small>
              </h6>
            </hgroup>

            <div class="link">
              <a href={"/post/" + slug} role="button">Read &rarr;</a>
            </div>
          </article>
        {/if}
      {/each}
    </div>
  {/key}
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
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    aspect-ratio: 16/9;
  }

  hgroup,
  .link {
    padding-inline: var(--spacing);
  }

  hgroup {
    padding-top: var(--spacing);
  }
  .link {
    margin-top: auto;
    align-self: stretch;
    padding-bottom: var(--spacing);
  }
</style>
