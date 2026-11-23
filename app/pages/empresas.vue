<script setup>
import { Form, FormField } from '@primevue/forms';

const supabase = useSupabase();
const { user, initialized, initAuth } = useAuth();

const empresas = ref([]);

const cargando = ref(false);
const errorConsulta = ref(null);

// Control del menú y formulario
const opcionesAbiertas = ref(null);
const empresaSeleccionada = ref(null);
const mostrarFormulario = ref(false);

// Estado del envío
const enviando = ref(false);
const mensajeEnvio = ref('');
const errorEnvio = ref(null);

// Panel lateral de registros
const mostrarRegistros = ref(false);
const empresaRegistrosSeleccionada = ref(null);

const registrosEmpresa = ref([]);
const cargandoRegistros = ref(false);
const errorRegistros = ref(null);

// Abrir panel y obtener registros de una empresa
const abrirRegistros = async (empresa) => {
    empresaRegistrosSeleccionada.value = empresa;
    mostrarRegistros.value = true;

    registrosEmpresa.value = [];
    errorRegistros.value = null;
    cargandoRegistros.value = true;

    console.log('Empresa seleccionada:', empresa.nombre);

    const { data, error } = await supabase
        .from('registro-contactos-test')
        .select('*')
        .eq('nombre_empresa', empresa.nombre);

    console.log('Datos obtenidos:', data);
    console.log('Error de Supabase:', error);

    if (error) {
        console.error('Error obteniendo registros:', error);
        errorRegistros.value = error.message;
    } else {
        registrosEmpresa.value = data ?? [];
    }

    cargandoRegistros.value = false;
};

// Cerrar panel
const cerrarRegistros = () => {
    mostrarRegistros.value = false;
    empresaRegistrosSeleccionada.value = null;
    registrosEmpresa.value = [];
    errorRegistros.value = null;
};

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

// Abrir o cerrar opciones de una empresa
const alternarOpciones = (id) => {
    opcionesAbiertas.value =
        opcionesAbiertas.value === id ? null : id;
};

// Mostrar formulario para una empresa
const abrirFormulario = (empresa) => {
    empresaSeleccionada.value = empresa;
    mostrarFormulario.value = true;

    opcionesAbiertas.value = null;
    mensajeEnvio.value = '';
    errorEnvio.value = null;
};

// Cerrar formulario
const cerrarFormulario = () => {
    mostrarFormulario.value = false;
    empresaSeleccionada.value = null;
    mensajeEnvio.value = '';
    errorEnvio.value = null;
};

// Validaciones
const resolver = ({ values }) => {
    const errors = {};

    if (!values.descripcion?.trim()) {
        errors.descripcion = [
            { message: 'Dé una descripción del contacto.' }
        ];
    }

    return { values, errors };
};

// Enviar formulario
const onFormSubmit = async (event) => {
    if (!event.valid || !empresaSeleccionada.value) return;

    enviando.value = true;
    mensajeEnvio.value = '';
    errorEnvio.value = null;

    const datos = {
        ...event.values,
        nombre_empresa: empresaSeleccionada.value.nombre
    };

    const { error } = await supabase
        .from('registro-contactos-test')
        .insert(datos);

    if (error) {
        console.error('Error registrando contacto:', error);
        errorEnvio.value = error.message;
    } else {
        mensajeEnvio.value = 'Contacto registrado correctamente.';
    }

    enviando.value = false;
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

            <div class="max-w mx-5 px-6 py-10">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 class="text-3xl font-bold">
                        Empresas registradas
                    </h1>
                    <div class="flex gap-3">
                        <button @click="obtenerEmpresas" :disabled="cargando"
                            class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-md
                        bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed border border-blue-800">
                            <i class="pi pi-refresh" :class="{ 'animate-spin': cargando }"></i>
                            {{ cargando ? 'Actualizando...' : 'Actualizar' }}
                        </button>
                    </div>
                </div>

                <div v-if="cargando"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">

                    <div v-for="n in 6" :key="n"
                        class="rounded-xl shadow-xl p-5 border border-gray-200 bg-white animate-pulse">

                        <div class="flex justify-between items-center gap-4 mb-5">
                            <div class="h-6 bg-gray-300 rounded-md w-2/3"></div>
                            <div class="h-6 bg-gray-200 rounded-full w-20"></div>
                        </div>

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

                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">

                    <div v-for="(empresa, index) in empresas" :key="empresa.id ?? index"
                        class="rounded-xl shadow-xl border border-gray-200 min-w-0 break-words overflow-hidden" :class="{
                            'bg-[#D6D6D6]': !['activa', 'contactada'].includes(empresa.estado?.toLowerCase())
                        }">

                        <!-- Barra superior según el estado -->
                        <div class="h-2 w-full" :class="{
                            'bg-green-500': empresa.estado?.toLowerCase() === 'activa',
                            'bg-yellow-400': empresa.estado?.toLowerCase() === 'contactada',
                            'bg-red-500': !['activa', 'contactada'].includes(empresa.estado?.toLowerCase())
                        }"></div>

                        <!-- Contenido de la tarjeta -->
                        <div class="p-5">
                            <!-- Top de la tarjeta -->
                            <div class="flex justify-between items-center gap-4">

                                <h2 class="text-xl font-bold mb-3">
                                    {{ empresa.nombre ?? 'Empresa sin nombre' }}
                                </h2>
                                <div class="flex gap-2">
                                    <span class="text-sm font-bold px-4 py-2 rounded-full shadow-md" :class="{
                                        'bg-green-200 text-green-800 border border-green-800': empresa.estado?.toLowerCase() === 'activa',
                                        'bg-yellow-200 text-yellow-800 border border-yellow-800': empresa.estado?.toLowerCase() === 'contactada',
                                        'bg-red-200 text-red-800 border border-red-800': !['activa', 'contactada'].includes(empresa.estado?.toLowerCase())
                                    }">
                                        {{ empresa.estado || 'Inactiva' }}
                                    </span>
                                    <div>

                                        <div class="relative">
                                            <button @click="alternarOpciones(empresa.id)"
                                                class="p-2 rounded-lg hover:bg-gray-300 transition border border-gray-200 shadow-md"
                                                aria-label="Opciones de empresa"
                                                :aria-expanded="opcionesAbiertas === empresa.id">
                                                <i class="pi pi-cog"></i>
                                            </button>
                                            
                                            <div v-if="opcionesAbiertas === empresa.id" class="absolute right-0 top-full mt-2 z-20 w-48
                                                bg-white rounded-lg shadow-xl border border-gray-200 p-2 flex">
                                                <p>Estado actual: </p>
                                                <p class="ml-2 rounded-full p-[2px] px-[4px] text-xs font-bold" :class="{
                                                    'bg-green-200 text-green-800 border border-green-800': empresa.estado?.toLowerCase() === 'activa',
                                                    'bg-yellow-200 text-yellow-800 border border-yellow-800': empresa.estado?.toLowerCase() === 'contactada',
                                                    'bg-red-200 text-red-800 border border-red-800': !['activa', 'contactada'].includes(empresa.estado?.toLowerCase())
                                                }"> {{ empresa.estado || 'Inactiva' }} </p>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <!-- Medio de la tarjeta -->
                            <div class="mt-3">
                                <div class="text-sm text-gray-600 mb-2">
                                    <span class="font-semibold text-gray-800">
                                        Dirección:
                                    </span>

                                    {{ empresa.calle ?? '' }} {{ empresa.n_direccion ?? '' }}
                                </div>

                                <!-- Resto de la información -->
                                <div v-for="(valor, campo) in empresa" :key="campo">

                                    <div v-if="
                                        !['id', 'fecha_creacion', 'estado', 'calle', 'n_direccion'].includes(campo)
                                    " class="text-sm text-gray-600 mb-2">

                                        <span class="font-semibold text-gray-800" style="text-transform: capitalize;">
                                            {{ campo }}:
                                        </span>

                                        {{ valor ?? 'Sin información' }}
                                    </div>

                                </div>

                            </div>
                            <!-- Footer de la tarjeta -->
                            <div class="flex flex-wrap gap-1">
                                <button @click="abrirFormulario(empresa)"
                                    class="w-full flex items-center gap-2 px-3 py-2
                                text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-300 transition  min-w-[190px] md:max-w-[49.2%] md:min-w-[40%] border border-gray-200">
                                    <i class="pi pi-plus"></i>
                                    Agregar un registro
                                </button>
                                <button @click="abrirRegistros(empresa)" class="w-full flex items-center gap-2 px-3 py-2
                                    text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-300 transition min-w-[190px] border border-gray-200
                                    md:max-w-[49.2%] md:min-w-[40%]">
                                    <i class="pi pi-address-book"></i>
                                    Ver registros
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

                <p class="mt-6 text-sm text-gray-500">
                    Total de empresas: {{ empresas.length }}
                </p>

                <!-- Formulario de registro de interacciones (Modal) -->
                <Teleport to="body">
                    <Transition name="modal">
                        <div v-if="mostrarFormulario && empresaSeleccionada"
                            class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                            @click.self="cerrarFormulario">
                            <!-- Fondo oscuro -->
                            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="cerrarFormulario"></div>

                            <!-- Contenedor del formulario -->
                            <section class="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto
                p-6 md:p-8 rounded-xl shadow-2xl" style="background-color: #EAEAEA;">
                                <div class="flex justify-between items-center gap-4 mb-6">
                                    <h2 class="font-bold text-xl">
                                        Registro de interacciones
                                    </h2>

                                    <button @click="cerrarFormulario"
                                        class="p-2 rounded-lg hover:bg-gray-300 transition"
                                        aria-label="Cerrar formulario">
                                        <i class="pi pi-times"></i>
                                    </button>
                                </div>

                                <p class="text-sm text-gray-600 mb-6">
                                    Registrando interacción para:
                                    <strong>{{ empresaSeleccionada.nombre }}</strong>
                                </p>

                                <Form :key="empresaSeleccionada.id" :resolver="resolver" @submit="onFormSubmit"
                                    class="flex flex-col gap-4">
                                    <FormField v-slot="$field" name="nombre_empresa"
                                        :initialValue="empresaSeleccionada.nombre">
                                        <Label for="nombre_empresa">
                                            Nombre de la empresa
                                        </Label>

                                        <InputText id="nombre_empresa" v-bind="$field.props" class="w-full !py-3"
                                            readonly />
                                    </FormField>

                                    <FormField v-slot="$field" name="descripcion" initialValue="">
                                        <Label for="descripcion">
                                            * Descripción
                                        </Label>

                                        <Textarea id="descripcion" v-bind="$field.props"
                                            placeholder="Escribe una descripción del contacto..." class="w-full"
                                            rows="6" autoResize />

                                        <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                                            {{ $field.error?.message }}
                                        </Message>
                                    </FormField>

                                    <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
                                        <div class=" rounded-lg border border-gray-300">    
                                            <Button type="button" severity="secondary" outlined @click="cerrarFormulario">
                                                Cancelar
                                            </Button>
                                        </div>

                                        <div class=" rounded-lg border border-emerald-600">
                                            <Button class="" type="submit" severity="success" :loading="enviando"
                                            :disabled="enviando">
                                            Registrar contacto
                                        </Button>
                                        </div>
                                    </div>

                                    <Message v-if="mensajeEnvio" severity="success">
                                        {{ mensajeEnvio }}
                                    </Message>

                                    <Message v-if="errorEnvio" severity="error">
                                        Error al registrar: {{ errorEnvio }}
                                    </Message>
                                </Form>
                            </section>
                        </div>
                    </Transition>
                </Teleport>


                <!-- Panel lateral de registros -->
                <Teleport to="body">
                    <Transition name="drawer">
                        <div v-if="mostrarRegistros && empresaRegistrosSeleccionada"
                            class="fixed inset-0 z-[9998] flex justify-end">
                            <!-- Fondo oscuro -->
                            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="cerrarRegistros"></div>

                            <!-- Panel lateral -->
                            <aside class="drawer-panel relative z-10 flex flex-col
                w-full max-w-xl h-full bg-white shadow-2xl">
                                <!-- Encabezado -->
                                <div class="flex justify-between items-center gap-4
                    p-6 border-b border-gray-200 bg-gray-50">

                                    <div>
                                        <h2 class="text-xl font-bold text-gray-800">
                                            Registros de interacciones
                                        </h2>

                                        <p class="text-sm text-gray-500 mt-1">
                                            Registros de {{ empresaRegistrosSeleccionada.nombre }}
                                        </p>
                                    </div>

                                    <button @click="cerrarRegistros" class="p-2 rounded-lg hover:bg-gray-200 transition"
                                        aria-label="Cerrar registros">
                                        <i class="pi pi-times text-lg"></i>
                                    </button>
                                </div>

                                <!-- Contenido -->
                                <div class="flex-1 overflow-y-auto p-6">

                                    <!-- Cargando -->
                                    <div v-if="cargandoRegistros" class="flex flex-col items-center justify-center
                        py-16 text-gray-500">
                                        <i class="pi pi-spin pi-spinner text-3xl mb-4"></i>
                                        <p>Obteniendo registros...</p>
                                    </div>

                                    <!-- Error -->
                                    <div v-else-if="errorRegistros" class="p-4 rounded-lg bg-red-100 text-red-700">
                                        <i class="pi pi-exclamation-circle mr-2"></i>
                                        Error al obtener registros: {{ errorRegistros }}
                                    </div>

                                    <!-- Sin registros -->
                                    <div v-else-if="registrosEmpresa.length === 0" class="flex flex-col items-center justify-center
                        py-16 text-center text-gray-500">
                                        <i class="pi pi-inbox text-5xl mb-4"></i>

                                        <h3 class="font-semibold text-lg">
                                            No hay registros
                                        </h3>

                                        <p class="text-sm mt-2">
                                            Esta empresa todavía no tiene contactos registrados.
                                        </p>
                                    </div>

                                    <!-- Lista de registros -->
                                    <div v-else class="flex flex-col gap-4">

                                        <div v-for="(registro, index) in registrosEmpresa" :key="registro.id ?? index"
                                            class="p-5 rounded-xl border border-gray-200
                            shadow-sm bg-gray-50">
                                            <div class="flex justify-between items-center mb-3">
                                                <h3 class="font-bold text-gray-800">
                                                    Registro #{{ index + 1 }}
                                                </h3>

                                                <span class="text-xs text-gray-500">
                                                    Contacto
                                                </span>
                                            </div>

                                            <p class="text-sm text-gray-700 whitespace-pre-wrap">
                                                {{ registro.descripcion }}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <!-- Pie -->
                                <div class="p-4 border-t border-gray-200 bg-gray-50">
                                    <p class="text-sm text-gray-500">
                                        Total de registros:
                                        <strong>{{ registrosEmpresa.length }}</strong>
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </Transition>
                </Teleport>


            </div>
        </section>
    </main>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
    transition: opacity 0.25s ease;
}

.drawer-enter-from,
.drawer-leave-to {
    opacity: 0;
}

/* Deslizamiento del panel */
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
    transform: translateX(100%);
}
</style>