<script>
  export let headings;
</script>

<ul>
  {#each headings as item}
    <li>
      {#if Array.isArray(item)}
        <svelte:self headings={item} />
      {:else}
        <a href="#{item.slug}" data-nounderline>{item.text}</a>
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
    font-weight: 500;
  }

  :global(.toc > ul > li ul) {
    padding-left: var(--spacing);
  }
</style>
