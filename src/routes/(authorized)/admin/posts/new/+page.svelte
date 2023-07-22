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
				header: Header,
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
</script>

<aside class="mt-4 flex flex-col text-center justify-center">
	<h2>New Post</h2>
	<small>to begin start typing!</small>
</aside>

<section class="p-2 sm:py-2 px-6" id="editorjs" />
