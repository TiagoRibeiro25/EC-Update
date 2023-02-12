<script setup>
import { useUsersStore } from "@/stores/users";
import { ref, watch } from "vue";
import Switches from "vue-switches";

const theme = ref(useUsersStore().isDarkMode());
const emit = defineEmits(["toggleTheme"]);

watch(theme, (value) => {
	theme.value = value;
	useUsersStore().toggleDarkMode();
	emit("toggleTheme", value);
});
</script>

<template>
	<div class="d-flex align-items-center justify-content-center pt-2">
		<Switches v-model="theme" color="success" theme="bootstrap" />
	</div>
</template>
