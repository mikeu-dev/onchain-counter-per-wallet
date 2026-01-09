<script lang="ts">
	import WalletConnect from '$lib/components/WalletConnect.svelte';
	import CounterDisplay from '$lib/components/CounterDisplay.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<!-- Header -->
	<header class="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-xl">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
							></path>
							<path d="M13 7h-2v5H7v2h4v4h2v-4h4v-2h-4z"></path>
						</svg>
					</div>
					<div>
						<h1 class="gradient-text text-xl font-bold">Onchain Counter</h1>
						<p class="hidden text-xs text-gray-400 sm:block">Decentralized Counter Per Wallet</p>
					</div>
				</div>
				<WalletConnect />
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="container mx-auto flex-1 px-4 py-12">
		<!-- Hero Section -->
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-5xl font-bold md:text-6xl">
				<span class="gradient-text">Your Personal</span>
				<br />
				<span class="text-white">On-Chain Counter</span>
			</h2>
			<p class="mx-auto max-w-2xl text-xl text-gray-400">
				A simple decentralized application that stores a counter value for each wallet address on
				the blockchain. Increment, decrement, or reset your counter anytime!
			</p>
		</div>

		<!-- Counter Component -->
		<CounterDisplay />

		<!-- Features Section -->
		<div class="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="card text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						></path>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Decentralized</h3>
				<p class="text-sm text-gray-400">
					Your counter is stored on the blockchain, ensuring transparency and immutability
				</p>
			</div>

			<div class="card text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						></path>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Personal</h3>
				<p class="text-sm text-gray-400">
					Each wallet address has its own independent counter that only you can modify
				</p>
			</div>

			<div class="card text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						></path>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold">Fast & Secure</h3>
				<p class="text-sm text-gray-400">
					Built with modern Web3 technologies for a smooth and secure user experience
				</p>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="mt-20 border-t border-white/10 bg-black/20 backdrop-blur-xl">
		<div class="container mx-auto px-4 py-8">
			<div class="text-center text-sm text-gray-400">
				<p>Built with ❤️ using SvelteKit, Wagmi, and Viem</p>
				<p class="mt-2">
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						class="transition-colors hover:text-white"
					>
						View on GitHub →
					</a>
				</p>
			</div>
		</div>
	</footer>
</div>
