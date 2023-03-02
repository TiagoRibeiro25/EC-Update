<script setup>
import { useUsersStore } from "@/stores/users";
import { ref, watchEffect, computed } from "vue";

const props = defineProps({
	filterName: { type: String, required: true },
	filterEmail: { type: String, required: true },
	filterRole: { type: String, required: true },
	roles: { type: Array, required: true },
});

const loading = ref(false);
const users = ref([]);
const roles = props.roles.slice(1);

const changeUserRole = (userId, newRole) => useUsersStore().changeUserRole(userId, newRole);

watchEffect(() => {
	loading.value = true;
	const filterName = props.filterName;
	const filterEmail = props.filterEmail;
	const filterRole = props.filterRole;

	setTimeout(() => {
		users.value = computed(() =>
			useUsersStore().getFilteredUsers(filterName, filterEmail, filterRole)
		).value;

		loading.value = false;
	}, 200);
}, [props.filterName, props.filterEmail, props.filterRole]);
</script>

<template>
	<div
		v-if="users.length === 0"
		class="table rounded shadow d-flex flex-column justify-content-center align-items-center"
		style="height: 460px"
	>
		<b-spinner v-if="loading" variant="success" label="Carregando..."></b-spinner>
		<h2 v-else class="status-msg error-msg mb-1">Nenhum Utilizador Encontrado</h2>
	</div>
	<div v-else class="col-12 table-container rounded shadow px-0">
		<table class="table table-hover table-striped table-responsive-sm">
			<caption class="text-center">
				Lista atual de Utilizadores da Plataforma
			</caption>
			<thead>
				<tr class="text-center align-middle">
					<th scope="col">Nome</th>
					<th scope="col">Email</th>
					<th scope="col">Cargo</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id" :id="user.id">
					<td class="text-center align-middle">
						{{ user.name }}
					</td>
					<td class="text-center align-middle">
						{{ user.email }}
					</td>
					<td class="col-4">
						<b-form-select
							class="select-user-role-input col-12 text-center"
							v-model="user.role"
							@change="changeUserRole(user.id, $event)"
						>
							<option v-for="(role, index) in roles" :value="role.value" :key="index">
								{{ role.text }}
							</option>
						</b-form-select>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #e4f0e8;
$fourth-color: #ffffff;
$fifth-color: #18516f;
$sixth-color: #000;
$seventh-color: #57b894;
$eighth-color: #3e4847;

.error-msg {
	color: $secondary-color;
	font-family: "Panton", sans-serif;
	font-weight: 700;
	font-size: 2rem;
	text-align: center;
	animation: showFromBottom 0.5s ease-in-out;
}

.table {
	background-color: $eighth-color;
	color: $secondary-color;
	cursor: default;

	& thead {
		& tr {
			font-family: "Panton", sans-serif;
			font-weight: 700;
			font-size: 22px;
			background-color: $eighth-color;

			& th {
				border: 2px solid $sixth-color;
			}
		}
	}

	tbody {
		& tr {
			font-family: "Panton", sans-serif;
			font-weight: 700;
			font-size: 1.25rem;
			background-color: $primary-color;
			animation: fadeIn 0.5s ease-in-out;

			&:hover {
				color: $fourth-color;
			}

			& td {
				border: 2px solid $sixth-color;

				& .select-user-role-input {
					background-color: $primary-color;
					color: $secondary-color;
					font-family: "Panton", sans-serif;
					font-weight: 700;
					font-size: 1.25rem;
					border: none;
					padding: 0 10px;
					cursor: pointer;
					transition: all 0.3s ease-in-out;

					&:focus {
						background-color: $primary-color;
						color: $secondary-color;
						border: 2px solid $seventh-color;
						outline: none;
						box-shadow: none;
					}
				}
			}
		}
	}
}

.table-container {
	overflow-y: scroll;
	height: 460px;
	border-radius: 25px;
	background-color: $eighth-color;

	&::-webkit-scrollbar {
		width: 15px;
	}

	&::-webkit-scrollbar-track {
		background: $primary-color;
	}

	&::-webkit-scrollbar-thumb {
		background: $seventh-color;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: $tertiary-color;
	}

	&::-webkit-scrollbar-thumb:active {
		background: $tertiary-color;
	}
}

caption {
	color: $seventh-color;
	font-family: "Panton", sans-serif;
	font-weight: 700;
	font-size: 17px;
}

@keyframes showFromBottom {
	0% {
		opacity: 0;
		transform: translateY(100%);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
