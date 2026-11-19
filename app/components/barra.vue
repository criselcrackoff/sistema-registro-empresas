<script setup>
const { user, initialized, initAuth, logout } = useAuth();

const showMenu = ref(false);

// Primera letra del correo
const avatarLetter = computed(() => {
    return user.value?.email?.charAt(0).toUpperCase() ?? '?';
});

// Recuperar la sesión al cargar la barra
onMounted(() => {
    initAuth();
});

// Cerrar el menú al cerrar sesión
const cerrarSesion = async () => {
    showMenu.value = false;
    await logout();
};
</script>


<template>
    <div id="nav-bar" class="relative z-10 flex w-full items-center justify-center
               px-3 py-3 shadow-md
               sm:justify-end sm:px-6 sm:py-4 md:py-6">

        <nav class="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:gap-3">

            <NuxtLink to="/" class="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium
                       text-gray-700 transition-colors duration-200
                       hover:bg-gray-300 hover:ring-2 ring-emerald-400
                       sm:px-4 sm:text-base">
                Inicio
            </NuxtLink>

            <NuxtLink to="/contacto" class="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium
                       text-gray-700 transition-colors duration-200
                       hover:bg-gray-300 hover:ring-2 ring-emerald-400
                       sm:px-4 sm:text-base">
                Contacto
            </NuxtLink>

            <template v-if="!initialized">
                <div class="h-10 w-36 animate-pulse rounded-lg bg-gray-300 sm:h-11 sm:w-44"></div>
            </template>

            <template v-else-if="user">
                <NuxtLink to="/empresas" class="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-medium
                    text-gray-700 transition-colors duration-200 hover:bg-emerald-300 hover:ring-2 ring-emerald-600
                    sm:px-4 sm:text-base">
                    Empresas
                </NuxtLink>

                <div class="relative">
                    <button type="button" @click="showMenu = !showMenu" :title="user.email" class="flex h-11 w-11 items-center justify-center
                        rounded-full bg-emerald-400 text-lg font-bold text-white shadow-md transition-all duration-200
                        hover:bg-emerald-300 hover:ring-2 hover:ring-emerald-600">
                        {{ avatarLetter }}
                    </button>

                    <div v-if="showMenu" class="absolute right-0 top-full mt-3 w-56
                               rounded-lg bg-white p-3 shadow-xl
                               border border-gray-200">
                        <p class="mb-3 break-all text-sm text-gray-600">
                            {{ user.email }}
                        </p>

                        <div class="border-t border-gray-200 pt-3">
                            <button type="button" @click="cerrarSesion" class="w-full rounded-lg bg-red-500 px-3 py-2
                                       text-sm font-medium text-white
                                       transition-colors hover:bg-red-600">
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </template>

            <NuxtLink v-else to="/ingreso" class="rounded-lg bg-emerald-400
                px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200
                hover:bg-emerald-300 hover:ring-2 ring-emerald-600 sm:px-4 sm:text-base">
                Ingreso Funcionario
            </NuxtLink>

        </nav>
    </div>
</template>


<style scoped>
#nav-bar {
    background: linear-gradient(to bottom,
            white,
            #CCCCCC);
}
</style>
