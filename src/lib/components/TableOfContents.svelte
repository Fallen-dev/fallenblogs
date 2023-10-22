<script>
  export let headings;
</script>

<ul>
  {#each headings as item}
    <li>
      {#if Array.isArray(item)}
        <svelte:self headings={item} />
      {:else}
        <a href="#{item.slug}" class="contrast">{item.text}</a>
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    margin-bottom: 0;
    padding-left: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    font-weight: 500;
  }

  :global(#toc > ul > li > ul > li) {
    padding-left: var(--spacing);
  }
</style>
