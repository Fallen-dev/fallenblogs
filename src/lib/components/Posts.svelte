<script>
  import { formatDate } from "$lib/utils";
  import { getCollection } from "astro:content";

  export let postTags = [];
  export let postId = "";

  async function getblogs() {
    const all = await getCollection("blogs", ({ data: { tags }, id }) =>
      tags.find(
        (e) =>
          postTags.find((tag) => tag.toLowerCase() == e.toLowerCase()) &&
          postId != id
      )
    );

    return all;
  }
</script>

{#await getblogs() then data}
  {#if data.length > 0}
    <section>
      <h5>Related posts</h5>
      <div class="content">
        {#each data as { data: { title, publishedOn }, slug, render }}
          {#await render() then data}
            <article>
              <hgroup>
                <h5>{title}</h5>
                <h6>
                  {formatDate(publishedOn)} &bull; {data.remarkPluginFrontmatter
                    .minutesRead}
                </h6>
              </hgroup>

              <a href="/post/{slug}" role="button">Read &rarr;</a>
            </article>
          {/await}
        {/each}
      </div>
    </section>
  {/if}
{/await}

<style>
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
