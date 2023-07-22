<script>
	import {
		Datatable,
		SearchInput,
		PaginationButtons,
		PaginationRowCount
	} from 'svelte-simple-datatables';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { IconPlus, IconTrashX, IconEdit, IconEye } from '@tabler/icons-svelte';

	// svelte datatable docs
	//https://github.com/vincjo/datatables/blob/master/src/routes/(local)/reactivity/Datatable.svelte

	let posts;

	onMount(async () => {
		if ($page.data.user.authenticated) {
			const res = await fetch(`/api/posts`);
			const data = await res.json();
			posts = data;
		}
	});

	let rows;
	const settings = {
		sortable: true,
		pagination: true,
		scrollY: true,
		rowsPerPage: 50,
		columnFilter: false,
		css: true,
		blocks: {
			searchInput: false,
			paginationButtons: false,
			paginationRowCount: false
		}
	};
</script>

{#if posts}
	<section class="py-4 px-12 h-5/6">
		<a class="btn btn-sm variant-ghost-success rounded" href="/admin/posts/new">
			<IconPlus size={24} stroke={2} />
			Create New
		</a>
		<aside class="border-solid border border-surface-50 dark:border-surface-600">
			<SearchInput id={'article-table'} />
		</aside>
		<div class="table-wrapper border-solid border border-surface-50 dark:border-surface-600">
			<Datatable data={posts} {settings} bind:dataRows={rows} id={'article-table'}>
				<thead>
					<th />
					<!-- <th data-key="id">ID</th> -->
					<th data-key="slug">Slug</th>
					<th data-key="title">Title</th>
					<th data-key="content">Content</th>
				</thead>
				<tbody>
					{#if rows}
						{#each $rows as row}
							<tr>
								<td>
									<div class="flex gap-2">
										<button
											class="btn btn-sm variant-ghost-secondary rounded"
											on:click={() => console.log('edit:', row)}
										>
											<IconEdit size={18} stroke={2} />
										</button>
										<button
											class="btn btn-sm variant-ghost-tertiary rounded"
											on:click={() => console.log('view:', row)}
										>
											<IconEye size={18} stroke={2} />
										</button>
										<button
											class="btn btn-sm variant-ghost-primary rounded"
											on:click={() => console.log('delete:', row)}
										>
											<IconTrashX size={18} stroke={2} />
										</button>
									</div>
								</td>
								<!-- <td>{row.id}</td> -->
								<td>{row.slug}</td>
								<td>{row.title}</td>
								<td>{row.content}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</Datatable>
		</div>
		<aside class="border-solid border border-surface-50 dark:border-surface-600">
			<PaginationButtons id={'article-table'} />
			<PaginationRowCount id={'article-table'} />
		</aside>
	</section>
{:else}
	<section class="card m-4 h-2/3">
		<div class="p-4 space-y-6">
			<!-- <div class="placeholder animate-pulse" /> -->
			<div class="grid grid-cols-2 gap-2">
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
			</div>
			<div class="grid grid-cols-1 gap-8">
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
			</div>
		</div>
	</section>
{/if}

<style>
	aside {
		display: flex;
		justify-content: space-between;
		padding: 8px 16px;
		border-radius: 2px;
		margin: 8px 0;
		background-color: white;
	}

	.table-wrapper {
		padding: 8px 0;
		height: 80%;
		background: white;
		border-radius: 2px;
	}
	.placeholder {
		height: 65px;
	}
	td {
		padding: 4px 8px;
		white-space: nowrap;
	}
	th,
	tr {
		/* border-bottom: rgba(var(--color-surface-100) / 1)!important; */
		/* background: rgba(var(--color-surface-800) / 1)!important; */
		color: black;
	}
</style>
