<script setup>
import ImgSlider from "@/components/ImgSlider.vue";

const props = defineProps({
	report: { type: Object, required: true },
	modalId: { type: String, required: true },
});

const report = props.report;
const modalId = props.modalId;
</script>

<template>
	<b-modal :id="modalId" size="lg" hide-footer>
		<div class="container">
			<div
				class="row mx-auto text-center d-flex justify-content-center align-items-center"
				style="transform: scale(0.9)"
			>
				<ImgSlider :images="report.images" />
			</div>
			<div class="row mx-auto mt-3">
				<p class="report-description text-justify">
					{{ report.description }}
				</p>
			</div>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
.report-description {
	font-family: "Panton", sans-serif;
	font-size: 1.25rem;
	font-weight: 500;
}
</style>
