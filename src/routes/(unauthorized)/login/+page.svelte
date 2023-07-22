<script>
	import { enhance } from '$app/forms';
	// import ListErrors from '$lib/ListErrors.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

{#if form?.success}
	<p>Successfully logged in! Welcome, {form.user.email}</p>
{/if}

<div class="login-wrapper">
	<div class="login card p-4 shadow">
		<div class="login-head"><p class="logo">logo</p></div>
		<form use:enhance method="POST" action="?/login">
			<fieldset class="form-group">
				<input
					class="form-control form-control-lg input"
					name="email"
					type="email"
					required
					placeholder="Email"
					value={form?.email ?? ''}
				/>
			</fieldset>
			<fieldset class="form-group mt-1">
				<input
					class="form-control form-control-lg input"
					name="password"
					type="password"
					required
					placeholder="Password"
				/>
			</fieldset>
			<input name="redirectTo" value="/" type="hidden" />
			<button class="btn btn-sm variant-filled uppercase" type="submit">sign in</button>
		</form>
	</div>
	{#if form?.missing}<p class="error">The email field is required</p>{/if}
	{#if form?.incorrect}<p class="error">Invalid login!</p>{/if}
</div>

<style>
	.login-head {
		display: flex;
		justify-content: center;
		margin: 0 0 1em 0;
	}
	.login-wrapper {
		height: 80%;
		width: 100%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	.login form {
		display: flex;
		flex-flow: column;
		gap: 1em;
	}

	input {
		outline: none;
		padding: 0.2em 0.5em;
	}
	.error {
		color: rgb(255, 88, 76);
	}
</style>
