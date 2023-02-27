<script setup>
import { convertDateToString } from "@/hooks/convertDate.js";
import { useUsersStore } from "@/stores/users.js";

const props = defineProps({
	theme: { type: Boolean, required: true },
	newItem: { type: Object, required: true },
});

const theme = props.theme;
const newItem = props.newItem;
const author = useUsersStore().getUserById(newItem.authorId);
</script>

<template>
	<div class="mt-5">
		<!-- Header -->
		<div class="row">
			<div class="col-10">
				<h1 class="new-title" :class="theme ? 'title-dark-theme' : 'title-light-theme'">
					{{ newItem.title }}
				</h1>
			</div>
			<div class="col-2">
				<div class="row">
					<div class="col-12">
						<h6
							class="text-muted text-right mt-3"
							:class="theme ? 'title-dark-theme' : 'title-light-theme'"
						>
							{{ convertDateToString(newItem.date) }}
						</h6>
					</div>
					<div class="col-12">
						<router-link :to="{ name: 'Account', params: { id: author.id } }">
							<h6
								class="text-muted text-right mt-1 author-name"
								:class="theme ? 'title-dark-theme' : 'title-light-theme'"
							>
								{{ author.name }}
							</h6>
						</router-link>
					</div>
				</div>
			</div>
		</div>

		<!-- Main -->
		<div class="row mb-3">
			<div class="col-12">
				<p
					class="mt-4 new-content"
					:class="theme ? 'content-dark-theme' : 'content-light-theme'"
				>
					{{ newItem.body }}
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #aedcc0;

.new-title {
	font-family: "Alkes", sans-serif;
	font-size: 2.3rem;
	font-weight: 700;
}

.new-content {
	font-family: "Panton", sans-serif;
	font-size: 1.3rem;
	font-weight: 400;
	line-height: 1.7;
	text-align: justify;
}

.title-dark-theme {
	color: $tertiary-color;
}

.title-light-theme {
	color: $primary-color;
}

.content-dark-theme {
	color: $secondary-color;
}

.content-light-theme {
	color: $primary-color;
}

.author-name {
	&:hover {
		text-decoration: underline;
	}
}
</style>
