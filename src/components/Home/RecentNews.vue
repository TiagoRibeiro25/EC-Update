<script setup>
import { ref } from "vue";
import { formatText } from "@/hooks/formatData.js";
import { convertDateToString } from "@/hooks/convertDate.js";
import { useNewsStore } from "@/stores/news";
import Arrow from "@/components/Home/Arrow.vue";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;

const news = ref(useNewsStore().getNews());
news.value = news.value.slice(0, 5);
const slide = ref(0);
</script>

<template>
	<div
		class="news-card shadow"
		:class="{ 'recent-new-bg-light': !theme, 'recent-new-bg-dark': theme }"
	>
		<div v-if="news.length > 0" class="row">
			<div class="col-1">
				<Arrow
					:options="{ direction: 'left', isDisabled: slide === 0 }"
					@click="slide--"
					:disabled="slide === 0"
					:theme="theme"
				/>
			</div>
			<!-- Image -->
			<div class="col-4 img-container d-none d-lg-block">
				<img :src="news[slide].images[0]" alt="Imagem da Notícia em Destaque" />
			</div>
			<!-- Content -->
			<div class="col-10 col-lg-6">
				<div class="row-3" style="height: 64px">
					<h1
						class="mt-5 new-title"
						:class="{
							'recent-new-text-light': !theme,
							'recent-new-title-dark': theme,
						}"
					>
						{{ formatText(news[slide].title, 44).toUpperCase() }}
					</h1>
				</div>
				<div class="row-6" style="height: 136px">
					<p
						class="mt-3 text-left new-text"
						:class="{
							'recent-new-text-light': !theme,
							'recent-new-text-dark': theme,
						}"
					>
						{{ formatText(news[slide].body, 250) }}
					</p>
				</div>
				<div class="row-3">
					<div class="row">
						<div class="col-6 text-left mt-3">
							<p
								class="recent-new-date"
								:class="{
									'recent-new-text-light': !theme,
									'recent-new-text-dark': theme,
								}"
							>
								{{ convertDateToString(news[slide].date) }}
							</p>
						</div>
						<div class="col-6 text-right mt-3">
							<router-link
								class="see-details-btn py-2 px-3"
								:class="{
									'recent-new-btn-light': !theme,
									'recent-new-btn-dark': theme,
								}"
								:to="{ name: 'NewsDetails', params: { id: news[slide].id } }"
							>
								Ver Mais
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="col-1">
				<Arrow
					:options="{ direction: 'right', isDisabled: slide === news.length - 1 }"
					@click="slide++"
					:disabled="slide === news.length - 1"
					:theme="theme"
				/>
			</div>
		</div>
		<div v-else class="row">
			<div class="col-12 pt-5">
				<h1
					class="mt-5 new-title text-center pt-5"
					style="font-size: 30px; font-weight: 400"
				>
					Não existem notícias para mostrar
				</h1>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.news-card {
	background-color: $secondary-color;
	width: 900px;
	height: 350px;
	margin: 0 auto;
	border-radius: 25px;
}

.img-container {
	img {
		width: 100%;
		height: 250px;
		object-fit: cover;
		border-radius: 15px;
		margin-top: 50px;
	}
}

.new-title {
	font-family: "Alkes", sans-serif;
	font-size: 23px;
	font-weight: 700;
	text-align: left;
}

.new-text {
	font-family: "Panton", sans-serif;
	font-size: 16px;
	font-weight: 400;
}

.recent-new-date {
	font-family: "Panton", sans-serif;
	font-size: 0.9rem;
	font-weight: 400;
	opacity: 0.7;
}

.see-details-btn {
	border-radius: 15px;
	border: none;
	width: 100px;
	height: 40px;
	font-family: "Panton", sans-serif;
	font-size: 16px;
	font-weight: 400;
	transition: background-color 0.2s ease-in-out;
}

.recent-new-bg-light {
	background-color: $secondary-color;
}

.recent-new-bg-dark {
	background-color: $primary-color;
}

.recent-new-text-light {
	color: $primary-color;
}

.recent-new-text-dark {
	color: $tertiary-color;
}

.recent-new-title-dark {
	color: $fifth-color;
}

.recent-new-btn-light {
	background-color: $primary-color;
	color: $tertiary-color;

	&:hover {
		background-color: $fourth-color;
		text-decoration: none;
	}
}

.recent-new-btn-dark {
	background-color: $tertiary-color;
	color: $primary-color;

	&:hover {
		background-color: $fourth-color;
		color: $tertiary-color;
		text-decoration: none;
	}
}

@media (max-width: 1090px) {
	.news-card {
		width: 800px;
	}
}

@media (max-width: 950px) {
	.news-card {
		width: 100%;
	}
}
</style>
