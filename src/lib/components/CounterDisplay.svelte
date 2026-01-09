<script lang="ts">
	import {
		useAccount,
		useReadContract,
		useWriteContract,
		useWaitForTransactionReceipt
	} from 'wagmi';
	import { getContractAddress } from '$lib/web3/config';
	import CounterABI from '$lib/web3/Counter.abi.json';

	const account = useAccount();

	// Read counter value
	const counter = useReadContract({
		address: $derived(() => {
			try {
				return getContractAddress($account.data?.chainId || 31337);
			} catch {
				return undefined;
			}
		}),
		abi: CounterABI,
		functionName: 'getMyCounter',
		query: {
			enabled: $derived(!!$account.data?.address),
			refetchInterval: 3000 // Refetch setiap 3 detik
		}
	});

	// Write contract hooks
	const { writeContract, data: hash, isPending, error } = useWriteContract();

	// Wait for transaction
	const receipt = useWaitForTransactionReceipt({
		hash: $derived($hash.data)
	});

	// Increment counter
	function increment() {
		if (!$account.data?.chainId) return;

		try {
			const address = getContractAddress($account.data.chainId);
			writeContract({
				address,
				abi: CounterABI,
				functionName: 'increment'
			});
		} catch (err) {
			console.error('Increment error:', err);
		}
	}

	// Decrement counter
	function decrement() {
		if (!$account.data?.chainId) return;

		try {
			const address = getContractAddress($account.data.chainId);
			writeContract({
				address,
				abi: CounterABI,
				functionName: 'decrement'
			});
		} catch (err) {
			console.error('Decrement error:', err);
		}
	}

	// Reset counter
	function reset() {
		if (!$account.data?.chainId) return;

		try {
			const address = getContractAddress($account.data.chainId);
			writeContract({
				address,
				abi: CounterABI,
				functionName: 'reset'
			});
		} catch (err) {
			console.error('Reset error:', err);
		}
	}

	// Computed states
	const isLoading = $derived($isPending.data || $receipt.data?.isLoading);
	const isSuccess = $derived($receipt.data?.isSuccess);
	const counterValue = $derived($counter.data?.data ? Number($counter.data.data) : 0);
</script>

<div class="card mx-auto max-w-2xl">
	<!-- Header -->
	<div class="mb-8 text-center">
		<h2 class="gradient-text mb-2 text-3xl font-bold">Your Counter</h2>
		<p class="text-gray-400">Increment, decrement, or reset your personal on-chain counter</p>
	</div>

	{#if !$account.data?.address}
		<!-- Not Connected State -->
		<div class="py-12 text-center">
			<svg
				class="mx-auto mb-4 h-16 w-16 text-gray-600"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
				></path>
			</svg>
			<p class="text-xl text-gray-400">Please connect your wallet to continue</p>
		</div>
	{:else}
		<!-- Connected State -->
		<div class="space-y-8">
			<!-- Counter Display -->
			<div class="relative">
				<div
					class="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-blue-900/30 py-12 text-center"
				>
					{#if $counter.data?.isLoading}
						<div class="animate-pulse">
							<div class="text-7xl font-bold text-gray-600">...</div>
						</div>
					{:else if $counter.data?.error}
						<div class="text-red-400">
							<svg
								class="mx-auto mb-2 h-12 w-12"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<p>Error loading counter</p>
							<p class="mt-2 text-sm text-gray-500">
								Make sure contract is deployed on this network
							</p>
						</div>
					{:else}
						<div class="gradient-text text-8xl font-bold transition-all duration-500">
							{counterValue}
						</div>
					{/if}
				</div>

				<!-- Loading Overlay -->
				{#if isLoading}
					<div
						class="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm"
					>
						<div class="text-center">
							<div
								class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"
							></div>
							<p class="font-semibold text-white">Processing transaction...</p>
						</div>
					</div>
				{/if}
			</div>

			<!-- Action Buttons -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<button
					onclick={decrement}
					disabled={isLoading || counterValue === 0}
					class="btn-secondary group py-4 text-lg font-semibold"
				>
					<svg
						class="mr-2 inline-block h-6 w-6 transition-transform group-hover:scale-110"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"
						></path>
					</svg>
					Decrement
				</button>

				<button
					onclick={increment}
					disabled={isLoading}
					class="btn-primary group py-4 text-lg font-semibold"
				>
					<svg
						class="mr-2 inline-block h-6 w-6 transition-transform group-hover:scale-110"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
						></path>
					</svg>
					Increment
				</button>

				<button
					onclick={reset}
					disabled={isLoading || counterValue === 0}
					class="btn-secondary group py-4 text-lg font-semibold"
				>
					<svg
						class="mr-2 inline-block h-6 w-6 transition-transform group-hover:scale-110"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						></path>
					</svg>
					Reset
				</button>
			</div>

			<!-- Transaction Status -->
			{#if isSuccess}
				<div class="glass rounded-xl border border-green-500/30 bg-green-900/20 p-4">
					<div class="flex items-center gap-3">
						<svg
							class="h-6 w-6 text-green-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<div class="flex-1">
							<p class="font-semibold text-green-400">Transaction Successful!</p>
							{#if $hash.data}
								<a
									href={`https://etherscan.io/tx/${$hash.data}`}
									target="_blank"
									rel="noopener noreferrer"
									class="text-sm text-gray-400 transition-colors hover:text-white"
								>
									View on Explorer →
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/if}

			{#if $error.data}
				<div class="glass rounded-xl border border-red-500/30 bg-red-900/20 p-4">
					<div class="flex items-center gap-3">
						<svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<div class="flex-1">
							<p class="font-semibold text-red-400">Transaction Failed</p>
							<p class="text-sm text-gray-400">{$error.data.message}</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
