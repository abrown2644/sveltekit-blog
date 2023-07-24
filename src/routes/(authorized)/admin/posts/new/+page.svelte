<script>
	//   use this WYSIWYG editor?
	// https://bytemd.js.org/playground/
	//https://editorjs.io/
	//https://lexical.dev/

	//https://github.com/pablo-abc/svelte-editorjs ??

	import { onMount } from 'svelte';

	let editor;
	onMount(async () => {
		const EditorJSModule = await import('@editorjs/editorjs');
		const EditorJS = EditorJSModule.default;

		const HeaderModule = await import('@editorjs/header');
		const Header = HeaderModule.default;

		const ImageToolModule = await import('@editorjs/image');
		const ImageTool = ImageToolModule.default;

		// const LinkToolModule = await import('@editorjs/link');
		// const LinkTool = LinkToolModule.default;

		editor = new EditorJS({
			holder: 'editorjs',

			tools: {
				header:{
					class: Header,
					config: {
						placeholder: 'Enter a header'					
					}
				},
				
				image: {
					class: ImageTool,
					config: {
						endpoints: {
							byFile: '/api/media/uploadByFileFromEditor', // Your backend file uploader endpoint
							byUrl: 'http://localhost:8008/fetchUrl' // Your endpoint that provides uploading by Url
						}
					}
				}
			}
		});
	});

	// do this on 'save' button click and also every few seconds?
	// or after each keyup event wait a few seconds then fire save
	const handleSave = () => {
		editor.save().then((outputData) => {
			console.log('Article data: ', outputData);

		}).catch((error) => {
			console.log('Saving failed: ', error)
		});
	}

	let saveTimer;
	const onKeyUp = (e) => {
		clearTimeout(saveTimer);
		saveTimer = setTimeout(console.log('saved!'), 1000);
	}
</script>

<aside class="mt-4 flex flex-col text-center justify-center">
	<h2>New Post</h2>
	<small>to begin start typing!</small>
</aside>

<button on:click={handleSave}>Save</button>
<section class="p-2 sm:py-2 px-6" id="editorjs" />

<svelte:window on:keyup|preventDefault={onKeyUp} />