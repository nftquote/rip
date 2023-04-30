<input type="text" placeholder="name" value={name} on:change={handleChangeName}>
<button type="button" on:click={handleClickSubmit}>Greet to mint canister</button>

<script lang="ts">
  import { getMinterClient } from '../../client';
  import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';

  let name = '';

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = e => {
    name = (e.target as HTMLInputElement).value;
  }

  const handleClickSubmit: MouseEventHandler<HTMLButtonElement> = async (_) => {
    const minter = getMinterClient();
    const result = await minter.greet(name);

    console.log(`result: ${result}`);
  }
</script>