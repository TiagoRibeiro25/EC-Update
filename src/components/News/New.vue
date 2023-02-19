<script setup>
import NewImg from "@/components/News/NewImg.vue";
import NewDetails from "@/components/News/NewDetails.vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	newItem: { type: Object, required: true },
});
const theme = props.theme;
const newItem = props.newItem;
</script>

<template>
	<div
		class="row mx-auto mb-5 new-card shadow"
		:class="theme ? 'new-card-bg-dark' : 'new-card-bg-light'"
	>
		<div class="col-4 px-0 d-lg-block d-none">
			<router-link :to="{ name: 'NewsDetails', params: { id: newItem.id } }">
				<NewImg :image="newItem.images[0]" />
			</router-link>
		</div>
		<div class="col-lg-8 col-12 px-0">
			<NewDetails :theme="theme" :newItem="newItem" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;

.new-card {
	border-radius: 20px;
	height: 300px;
	animation: slideIn 0.7s ease-in-out;
}

.new-card-bg-dark {
	background-color: $primary-color;
}

.new-card-bg-light {
	background-color: $secondary-color;
}

@keyframes slideIn {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(0);
	}
}
</style>
