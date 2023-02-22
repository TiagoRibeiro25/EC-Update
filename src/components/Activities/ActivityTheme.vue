<script setup>
import { useThemesStore } from "@/stores/themes";

const props = defineProps({ activityTheme: { type: String, required: true } });
const activityTheme = useThemesStore().getThemeById(props.activityTheme);
</script>

<template>
	<div class="theme text-center px-3">
		{{ activityTheme.name }}
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;

.theme {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 18px;
	color: $primary-color;
	background-color: $secondary-color;
	border-radius: 10px;
}
</style>
