<script setup>
import ImgSlider from "@/components/ImgSlider.vue";
import { convertDateToString } from "@/hooks/convertDate.js";

const props = defineProps({
	modalId: { type: String, required: true },
	meeting: { type: Object, required: true },
});

const theme = props.theme;
const modalId = props.modalId;
const meeting = props.meeting;
</script>

<template>
	<b-modal :id="modalId" size="lg" hide-footer>
		<div class="container">
			<div class="text-center">
				<ImgSlider :images="meeting.ata.images" />
			</div>

			<div class="row mx-auto justify-content-end mt-4">
				<span class="modal-date">
					{{ convertDateToString(meeting.date) }}
				</span>
			</div>
			<div class="mt-2 mb-3">
				<p class="modal-description">
					{{ meeting.ata.description }}
				</p>
			</div>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
.modal-date {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 500;
}

.modal-description {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	text-align: justify;
	max-height: 25rem;
	overflow-y: scroll;
}
</style>
