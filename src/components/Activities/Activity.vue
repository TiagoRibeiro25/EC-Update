<script setup>
const props = defineProps({
	theme: { type: Boolean, required: true },
	activity: { type: Object, required: true },
	isVerifiedUser: { type: Boolean, required: true },
});

const theme = props.theme;
const activity = props.activity;
const isVerifiedUser = props.isVerifiedUser;
</script>

<template>
	<div>
		{{ activity }}
	</div>
</template>

<style lang="scss" scoped></style>
