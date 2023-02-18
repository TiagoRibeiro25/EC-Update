<script setup>
import { useSchoolsStore } from "@/stores/schools";

const props = defineProps({ user: { type: Object, required: true } });
const user = props.user;
const userSchool = useSchoolsStore().getSchoolById(user.schoolId).name;

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

<template>
	<div>
		<h3 class="user-name mb-2 mt-4">
			{{ user.name }}
		</h3>
		<span class="user-info d-block">{{ user.email }}</span>
		<span class="user-info d-block">
			{{ user.role === "unsigned" ? "Sem cargo" : capitalize(user.role) }}
			{{ user.role === "estudante" ? " - " + user.internalId : "" }}
		</span>
		<span class="user-info d-block">
			{{ userSchool }}
		</span>
		<div v-if="user.course">
			<span class="user-info d-block"
				>{{ user.course }}
				{{ user.year ? `- ${user.year} ano` : "" }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #6ea952;
$quaternary-color: #3fc380;

.user-name,
.user-info {
	font-family: "Panton", sans-serif;
	font-size: 1.7rem;
	font-weight: 700;
	color: $secondary-color;
}

.user-info {
	font-size: 1rem;
	font-weight: 400;
}
</style>
