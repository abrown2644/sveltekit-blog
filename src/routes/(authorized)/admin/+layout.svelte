<script>
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-modern.css';

	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../../../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';

	import Navigation from '../../../lib/components/Navigation.svelte';

	let expandMobileNav = false;

	const fadeIn = {
		delay: 100,
		duration: 200
	};

	function handleHamburgerClick() {
		expandMobileNav = !expandMobileNav;
		console.log(expandMobileNav);
	}
</script>

<!-- App Shell -->
<AppShell class="bg-slate-100 dark:bg-surface-800">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class="!bg-slate-200 dark:!bg-surface-800 shadow-md">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={handleHamburgerClick}>
						{#if expandMobileNav}
							x
						{:else}
							<span in:fade={fadeIn}>
								<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
									<rect width="100" height="20" />
									<rect y="30" width="100" height="20" />
									<rect y="60" width="100" height="20" />
								</svg>
							</span>
						{/if}
					</button>
					<a href="/">
						<strong class="hidden lg:block text-md uppercase">AB Web Dev</strong>
					</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation {expandMobileNav} />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
