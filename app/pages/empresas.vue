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
    console.log('Empresas obtenidas:', empresas.value);

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
                <h1 class="text-3xl font-bold mb-6">
                    Empresas registradas
                </h1>

                <div v-if="cargando" class="text-gray-500">
                    Cargando empresas...
                </div>

                <div v-else-if="errorConsulta" class="text-red-500">
                    Error al obtener empresas: {{ errorConsulta }}
                </div>

                <div v-else-if="empresas.length === 0" class="text-gray-500">
                    No hay empresas registradas.
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div v-for="(empresa, index) in empresas" :key="empresa.id ?? index"
                        class="rounded-xl shadow-xl p-5 border border-gray-200" style="background-color: #EAEAEA;">
                        <div class="flex gap-4">
                            <h2 class="text-xl font-bold mb-3">
                                {{ empresa.nombre ?? 'Empresa sin nombre' }}
                            </h2>
                            <div>
                                <h2 v-if="empresa.estado != ''" class="text-xl font-bold mb-3">
                                    {{ empresa.estado ?? 'no esta'}}
                                </h2>
                                <h2 v-if="empresa.estado == ''" class="text-xl font-bold mb-3">
                                    no
                                </h2>
                            </div>
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
