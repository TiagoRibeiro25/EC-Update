<script setup>
import { ref, watchEffect } from "vue";
import { useUsersStore } from "@/stores/users";

const theme = ref();

watchEffect(() => {
	theme.value = useUsersStore().isDarkMode();
}, [useUsersStore().isDarkMode()]);
</script>

<template>
	<div
		class="beta-popup py-2 px-3"
		:class="theme ? 'beta-popup-dark-theme' : 'beta-popup-light-theme'"
	>
		<b-badge variant="success" class="mr-2">Beta</b-badge>
		<span>
			Versão de testes do Ecoly -
			<b-link
				:class="theme ? 'github-repo-dark-theme' : 'github-repo-light-theme'"
				href="https://github.com/TiagoRibeiro25/EC-Update"
				target="_blank"
			>
				Github Repo
			</b-link>
		</span>
	</div>
</template>

<style lang="scss" scoped>
.beta-popup {
	position: fixed;
	bottom: 0;
	right: 0;
	border-top-left-radius: 10px;
	z-index: 1000;
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: default;
	transition: transform 0.5s ease-in-out;
}

.beta-popup-light-theme {
	background-color: rgba(248, 249, 250, 0.8);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	color: #343e3d;
}

.beta-popup-dark-theme {
	background-color: rgba(52, 62, 61, 0.8);
	box-shadow: 0 0 10px rgba(174, 220, 192, 0.2);
	color: #aedcc0;
}

.github-repo-light-theme {
	animation: github-repo-light-theme 1s infinite;
}

.github-repo-dark-theme {
	animation: github-repo-dark-theme 1s infinite;
}

@keyframes github-repo-light-theme {
	0% {
		color: #343e3d;
	}
	50% {
		color: #28a745;
	}
	100% {
		color: #343e3d;
	}
}

@keyframes github-repo-dark-theme {
	0% {
		color: #aedcc0;
	}
	50% {
		color: #e4f0e8;
	}
	100% {
		color: #aedcc0;
	}
}
</style>
