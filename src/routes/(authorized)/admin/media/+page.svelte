<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { IconCloudUpload } from '@tabler/icons-svelte';

	let media;
	let uploadFiles;

	async function onFileChangeHandler(e) {
		let files = e.target.files;
		let formData = new FormData();
		[...files].forEach((file, i) => {
			formData.append('image', file);
		});

		const res = await fetch('/api/media', { method: 'POST', body: formData });
		const data = await res.json();

		console.log('POST:', data);

		// if img upload success add to media arrays
		media.images.unshift(...data.images);
		media.videos.unshift(...data.videos);
		media = media;
		console.log('after POST:', media);
		document.cookie = 'clearcache=true';
		//TODO: after image upload, set cookie to clear cache next time images are called?
	}

	onMount(async () => {
		if ($page.data.user.authenticated) {
			const clearCacheCookie = getCookie('clearcache');
			let url = '/api/media';
			if (clearCacheCookie) url = '/api/media?clearcache';
			const res = await fetch(url); // if uploaded image then send ignore cache param
			const data = await res.json();
			media = data;
			console.log('GET:', media);
			eraseCookie('clearcache');
		}
	});

	function getCookie(name) {
		var dc = document.cookie;
		var prefix = name + '=';
		var begin = dc.indexOf('; ' + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		} else {
			begin += 2;
			var end = document.cookie.indexOf(';', begin);
			if (end == -1) {
				end = dc.length;
			}
		}
		// because unescape has been deprecated, replaced with decodeURI
		//return unescape(dc.substring(begin + prefix.length, end));
		return decodeURI(dc.substring(begin + prefix.length, end));
	}

	function eraseCookie(name) {
		document.cookie = name + '=; Max-Age=-99999999;';
	}
</script>

<div class="py-4 px-4 md:px-12">
	<FileDropzone multiple name="files" bind:files={uploadFiles} on:change={onFileChangeHandler}>
		<svelte:fragment slot="lead">
			<div class="flex justify-center">
				<IconCloudUpload size={36} stroke={2} />
			</div>
		</svelte:fragment>
		<svelte:fragment slot="message"><b>Upload a file</b></svelte:fragment>
		<svelte:fragment slot="meta"><small>PNG, JPEG, GIF</small></svelte:fragment>
	</FileDropzone>

	<section
		class="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-0.5 md:gap-1"
	>
		{#if media}
			{#each media.images as row}
				<div>
					<a target="_blank" href={row.url} title={row.name}>
						<img
							class="h-full object-fill w-full rounded-sm"
							style="background:#00000017;"
							src={row.url}
							alt=""
						/>
					</a>
				</div>
			{/each}
		{:else}
			{#each Array(25) as _, i}
				<div class="placeholder h-20 w-full rounded-sm animate-pulse" />
			{/each}
		{/if}
	</section>
</div>
