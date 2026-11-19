<script setup>
const supabase = useSupabase();

const { user, initialized, initAuth } = useAuth();

const empresas = ref([]);

const cargando = ref(false);
const errorConsulta = ref(null);

const obtenerEmpresas = async () => {
    cargando.value = true;
    errorConsulta.value = null;

    const { data, error } = await supabase
        .from('test')
        .select('*');

    if (error) {
        console.error('Error obteniendo empresas:', error);
        errorConsulta.value = error.message;
        cargando.value = false;
        return;
    }

    empresas.value = data;

    cargando.value = false;
};

onMounted(async () => {
    await initAuth();

    if (!user.value) {
        await navigateTo('/');
        return;
    }

    await obtenerEmpresas();
});
</script>

<template>
    <main class="min-h-screen">
        <div v-if="!initialized" class="flex min-h-[60vh] items-center justify-center">
            <p class="text-gray-500">Verificando sesión...</p>
        </div>

        <section v-else-if="user">
            <div>
                <Background />
                <Barra />
            </div>

            <div class="max-w-6xl mx-auto px-6 py-10">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 class="text-3xl font-bold">
                        Empresas registradas
                    </h1>

                    <button @click="obtenerEmpresas" :disabled="cargando"
                        class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                    bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="pi pi-refresh" :class="{ 'animate-spin': cargando }"></i>
                        {{ cargando ? 'Actualizando...' : 'Actualizar' }}
                    </button>
                </div>

                <div v-if="cargando" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div v-for="n in 6" :key="n"
                        class="rounded-xl shadow-xl p-5 border border-gray-200 bg-white animate-pulse">

                        <!-- Nombre y estado -->
                        <div class="flex justify-between items-center gap-4 mb-5">
                            <div class="h-6 bg-gray-300 rounded-md w-2/3"></div>
                            <div class="h-6 bg-gray-200 rounded-full w-20"></div>
                        </div>

                        <!-- Información de la empresa -->
                        <div class="space-y-4">

                            <div v-for="i in 4" :key="i" class="flex flex-col gap-2">
                                <div class="h-3 bg-gray-300 rounded w-1/4"></div>
                                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>

                        </div>

                    </div>

                </div>

                <div v-else-if="errorConsulta" class="text-red-500">
                    Error al obtener empresas: {{ errorConsulta }}
                </div>

                <div v-else-if="empresas.length === 0" class="text-gray-500">
                    No hay empresas registradas.
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div v-for="(empresa, index) in empresas" :key="empresa.id ?? index"
                        class="rounded-xl shadow-xl p-5 border border-gray-200" :class="{
                            'bg-[#D6D6D6]': empresa.estado?.toLowerCase() !== 'disponible' && empresa.estado?.toLowerCase() !== 'procesando'
                        }">
                        <div class="flex justify-between items-center gap-4">

                            <h2 class="text-xl font-bold mb-3">
                                {{ empresa.nombre ?? 'Empresa sin nombre' }}
                            </h2>

                            <span class="text-sm font-bold px-3 py-1 rounded-full" :class="{
                                'bg-green-200 text-green-800': empresa.estado?.toLowerCase() === 'disponible',
                                'bg-yellow-200 text-yellow-800': empresa.estado?.toLowerCase() === 'procesando',
                                'bg-red-200 text-red-800': !['disponible', 'procesando'].includes(empresa.estado?.toLowerCase())
                            }">
                                {{ empresa.estado || 'No disponible' }}
                            </span>
                        </div>
                        <div v-for="(valor, campo) in empresa" :key="campo">
                            <div v-if="campo !== 'id' && campo !== 'fecha_creacion' && campo !== 'estado'"
                                class="text-sm text-gray-600 mb-2">
                                <span class="font-semibold text-gray-800" style="text-transform: capitalize;">
                                    {{ campo }}:
                                </span>

                                {{ valor ?? 'Sin información' }}
                            </div>
                        </div>

                    </div>

                </div>

                <p class="mt-6 text-sm text-gray-500">
                    Total de empresas: {{ empresas.length }}
                </p>
            </div>
        </section>
    </main>
</template>
