<script lang="ts">
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { WagmiProvider } from 'wagmi';
	import { config } from '$lib/web3/config';

	const { children } = $props();

	// Create QueryClient untuk Tanstack Query
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: 1
			}
		}
	});
</script>

<svelte:head>
	<title>Onchain Counter Per Wallet</title>
	<meta name="description" content="Decentralized counter application on blockchain" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<WagmiProvider {config}>
	<QueryClientProvider client={queryClient}>
		{@render children()}
	</QueryClientProvider>
</WagmiProvider>
