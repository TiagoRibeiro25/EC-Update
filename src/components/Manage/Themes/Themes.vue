<script setup>
import Header from "@/components/Manage/Header.vue";
import Theme from "@/components/Manage/Themes/Theme.vue";
import AddThemeModal from "@/components/Manage/Themes/AddThemeModal.vue";
import { useThemesStore } from "@/stores/themes";
import { ref, watchEffect } from "vue";

const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
const themes = ref([]);

watchEffect(() => {
	themes.value = useThemesStore().getActiveThemes();
}, [themes]);
</script>

<template>
	<div class="row mx-5 mt-5">
		<Header
			title="TEMAS"
			description="adicionar temas para o plano de atividades"
			:theme="theme"
		/>
	</div>
	<div class="row mx-5 mt-5 d-flex justify-content-center align-items-center">
		<Theme
			v-for="themeItem in themes"
			:key="themeItem.id"
			:themeItem="themeItem"
			:theme="theme"
		/>

		<button
			type="button"
			class="btn add-theme-btn py-1 px-5 mx-2 mb-4"
			:class="theme ? 'theme-btn-dark-theme' : 'theme-btn-light-theme'"
			@click="$bvModal.show('add-theme-modal')"
		>
			+
		</button>
	</div>

	<AddThemeModal @close:modal="() => $bvModal.hide('add-theme-modal')" />
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.add-theme-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 700;
	outline: transparent;
	border-radius: 0.6rem;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: $fourth-color;
		color: $tertiary-color;
	}
}

.theme-btn-dark-theme {
	background-color: $fifth-color;
	color: $primary-color;
}

.theme-btn-light-theme {
	background-color: $primary-color;
	color: $tertiary-color;
}
</style>
