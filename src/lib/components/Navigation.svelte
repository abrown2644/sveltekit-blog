<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { IconBrandStackoverflow, IconHome, IconPhoto } from '@tabler/icons-svelte';

	export let expandMobileNav;

	const fadeIn = {
		delay: 100,
		duration: 200
	};

	const fadeOut = {
		delay: 0,
		duration: 100
	};

	$: isExpanded = true;
</script>

<!-- menu -->
<nav
	class:expanded={isExpanded}
	class="desktop hidden lg:flex bg-slate-50 dark:bg-surface-900 border-solid border-e border-surface-50 dark:border-surface-600"
>
	<div>
		<ul>
			<li class="w-full">
				<a
					href="/admin"
					class="flex items-center gap-2 m-1"
					class:active={$page.url.pathname === '/admin'}
				>
					<IconHome size={40} stroke={1} />
					{#if isExpanded}
						<span in:fade={fadeIn} out:fade={fadeOut}>Home</span>
					{/if}
				</a>
			</li>
			<li class="w-full">
				<a
					href="/admin/posts"
					class="flex items-center gap-2 m-1"
					data-sveltekit-prefetch
					class:active={$page.url.pathname === '/admin/posts'}
				>
					<IconBrandStackoverflow size={40} stroke={1} />
					{#if isExpanded}
						<span in:fade={fadeIn} out:fade={fadeOut}>Posts</span>
					{/if}
				</a>
			</li>
			<li class="w-full">
				<a
					href="/admin/media"
					class="flex items-center gap-2 m-1"
					class:active={$page.url.pathname === '/admin/media'}
				>
					<IconPhoto size={40} stroke={1} />
					{#if isExpanded}
						<span in:fade={fadeIn} out:fade={fadeOut}>Media</span>
					{/if}
				</a>
			</li>
		</ul>
		<!-- {#if isExpanded}
		<section in:fade="{fadeIn}" out:fade="{fadeOut}" >
			<hr />
			<ul>
				<h3>
					Folders
				</h3>
				<li>🧾 Receipts</li>
				<li>🤖 Autofilter</li>
			</ul>
		</section>
		{/if} -->
	</div>
	<button class="text-sm font-light uppercase mb-2" on:click={() => (isExpanded = !isExpanded)}>
		{#if isExpanded}
			Collapse Menu
		{:else}
			Open
		{/if}
	</button>
</nav>

<!-- mobile menu -->
<nav class:expandedMobile={expandMobileNav} class="mobile hidden bg-slate-800 text-white z-50">
	<ul>
		<li class="w-full">
			<a
				href="/admin"
				class="flex items-center gap-2 text-xl m1 text-white"
				class:active={$page.url.pathname === '/admin'}
			>
				<IconHome size={64} stroke={1} />
				{#if isExpanded}
					<span in:fade={fadeIn} out:fade={fadeOut}>Home</span>
				{/if}
			</a>
		</li>
		<li class="w-full">
			<a
				href="/admin/posts"
				class="flex items-center gap-2 text-xl m1 text-white"
				data-sveltekit-prefetch
				class:active={$page.url.pathname === '/admin/posts'}
			>
				<IconBrandStackoverflow size={64} stroke={1} />
				{#if isExpanded}
					<span in:fade={fadeIn} out:fade={fadeOut}>Posts</span>
				{/if}
			</a>
		</li>
		<li class="w-full">
			<a
				href="/admin/media"
				class="flex items-center gap-2 text-xl m1 text-white"
				class:active={$page.url.pathname === '/admin/media'}
			>
				<IconPhoto size={64} stroke={1} />
				{#if isExpanded}
					<span in:fade={fadeIn} out:fade={fadeOut}>Media</span>
				{/if}
			</a>
		</li>
	</ul>
</nav>

<style>
	.active {
		border: 1px solid rgba(var(--color-surface-400) / 1) !important;
		border-radius: 4px;
		box-shadow: 1px 1px;
	}
	.active span::after {
		content: '';
		height: 4px;
		width: 4px;
		position: absolute;
		border-radius: 50%;
		left: -10px;
		top: 10px;
		background-color: rgba(var(--color-primary-500) / 1);
	}
	nav {
		flex-direction: column;
		justify-content: space-between;
		grid-area: nav;
		height: 100%;
		transition: ease-out 200ms;
		width: 60px;
		overflow: hidden;
	}

	nav span {
		position: relative;
	}

	.desktop ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.75em;
		margin: 1em 0;
	}

	.mobile ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 1em;
		margin: 1em 0;
	}

	.expanded ul {
		align-items: flex-start;
	}

	.expanded {
		transition: ease-out 200ms;
		width: 200px;
	}
	.desktop li a {
		justify-content: center;
		border: 1px solid rgba(var(--color-surface-100) / 1);
		border-radius: 4px;
		gap: 1em;
	}
	.mobile li a {
		justify-content: flex-start;
		border: 1px solid rgba(var(--color-surface-100) / 1);
		border-radius: 4px;
		gap: 1em;
	}
	.expanded li a {
		justify-content: flex-start;
		border: 1px solid rgba(var(--color-surface-100) / 1);
		border-radius: 4px;
	}

	.expandedMobile {
		transition: ease-out 200ms;
		display: block;
		width: 80vw;
		position: absolute;
	}
</style>
