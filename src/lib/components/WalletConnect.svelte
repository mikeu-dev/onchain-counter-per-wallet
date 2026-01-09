<script lang="ts">
	import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';

	const account = useAccount();
	const { connectors, connect } = useConnect();
	const { disconnect } = useDisconnect();

	// Get balance untuk connected account
	const balance = useBalance({
		address: $derived($account.data?.address)
	});

	// Format address untuk display (0x1234...5678)
	function formatAddress(address: string): string {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	}

	// Format balance untuk display
	function formatBalance(value: bigint | undefined, decimals: number = 18): string {
		if (!value) return '0.0000';
		const formatted = Number(value) / Math.pow(10, decimals);
		return formatted.toFixed(4);
	}

	let showConnectModal = $state(false);
</script>

{#if $account.data?.address}
	<!-- Connected State -->
	<div class="flex items-center gap-4">
		<!-- Balance Display -->
		{#if $balance.data}
			<div class="glass hidden items-center gap-2 rounded-xl px-4 py-2 sm:flex">
				<span class="text-sm text-gray-300">
					{formatBalance($balance.data.value, $balance.data.decimals)}
					{$balance.data.symbol}
				</span>
			</div>
		{/if}

		<!-- Address Display -->
		<div class="glass rounded-xl px-4 py-2">
			<div class="flex items-center gap-2">
				<div class="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
				<span class="font-mono text-sm">{formatAddress($account.data.address)}</span>
			</div>
		</div>

		<!-- Disconnect Button -->
		<button onclick={() => disconnect()} class="btn-secondary text-sm"> Disconnect </button>
	</div>
{:else}
	<!-- Not Connected State -->
	<button onclick={() => (showConnectModal = true)} class="btn-primary">
		<svg class="mr-2 inline-block h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
			></path>
		</svg>
		Connect Wallet
	</button>
{/if}

<!-- Connect Modal -->
{#if showConnectModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		onclick={() => (showConnectModal = false)}
		role="button"
		tabindex="0"
	>
		<div
			class="card w-full max-w-md"
			onclick={(e) => e.stopPropagation()}
			role="button"
			tabindex="0"
		>
			<div class="mb-6 flex items-center justify-between">
				<h2 class="gradient-text text-2xl font-bold">Connect Wallet</h2>
				<button
					onclick={() => (showConnectModal = false)}
					class="text-gray-400 transition-colors hover:text-white"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</button>
			</div>

			<div class="space-y-3">
				{#each $connectors.data as connector (connector.id)}
					<button
						onclick={() => {
							connect({ connector });
							showConnectModal = false;
						}}
						disabled={!connector.ready}
						class="glass glass-hover flex w-full items-center gap-4 rounded-xl p-4 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500"
						>
							<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
								></path>
							</svg>
						</div>
						<div class="flex-1 text-left">
							<div class="font-semibold">{connector.name}</div>
							{#if !connector.ready}
								<div class="text-sm text-gray-400">Not installed</div>
							{/if}
						</div>
						<svg
							class="h-5 w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
							></path>
						</svg>
					</button>
				{/each}
			</div>

			<p class="mt-6 text-center text-sm text-gray-400">
				By connecting your wallet, you agree to our Terms of Service
			</p>
		</div>
	</div>
{/if}
