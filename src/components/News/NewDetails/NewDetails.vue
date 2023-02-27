<script setup>
import ImgSlider from "@/components/ImgSlider.vue";
import NewBody from "@/components/News/NewDetails/NewBody.vue";

const props = defineProps({
	newItem: { type: Object, required: true },
	theme: { type: Boolean, required: true },
});

const newItem = props.newItem;
const theme = props.theme;
</script>

<template>
	<div class="mt-3 mx-1">
		<ImgSlider :images="newItem.images" />
		<NewBody :newItem="newItem" :theme="theme" />
	</div>
</template>
