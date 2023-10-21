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
      <div id="content">
        {#each data as { data: { title, publishedOn, image }, slug, render }}
          {#await render() then data}
            <article>
              <div>
                <img
                  src={image ? image : "/images/placeholder.webp"}
                  alt="Poster of the post"
                  width="400"
                  height="200"
                  loading="lazy"
                />
              </div>

              <hgroup>
                <h5>{title}</h5>
                <h6>
                  {formatDate(publishedOn)} &bull; {data.remarkPluginFrontmatter
                    .minutesRead}
                </h6>
              </hgroup>

              <div class="link">
                <a href="/post/{slug}" role="button">Read &rarr;</a>
              </div>
            </article>
          {/await}
        {/each}
      </div>
    </section>
  {/if}
{/await}

<style>
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
