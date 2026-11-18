<script setup>
import { ref } from 'vue';

const fotos = [
    '/img/liceo1.jpg',
    '/img/liceo2.jpg',
    '/img/liceo3.jpg',
    '/img/liceo4.jpg'
];

const fotoSeleccionada = ref(fotos[0]);
</script>

<template>
    <div>
        <Background />
        <Barra />
    </div>

    <main class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">

        <section class="flex flex-col gap-4">

            <div class="w-full h-[350px] md:h-[450px] bg-white rounded-xl shadow-md overflow-hidden">
                <img :src="fotoSeleccionada" alt="Fotografía del liceo" class="w-full h-full object-cover" />
            </div>

            <div class="grid grid-cols-4 gap-3">
                <button v-for="(foto, index) in fotos" :key="foto" @click="fotoSeleccionada = foto"
                    class="h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all" :class="fotoSeleccionada === foto
                        ? 'border-gray-300 opacity-100'
                        : 'border-transparent opacity-70 hover:opacity-100'">
                    <img :src="foto" :alt="`Vista previa ${index + 1}`" class="w-full h-full object-cover" />
                </button>
            </div>

        </section>

        <section class="flex flex-col gap-4 bg-white rounded-xl shadow-md p-6">
            <h1 class="text-3xl font-bold text-gray-800">
                ¡Encuentre estudiantes de practica en Jorge Alessandri Rodriguez!
            </h1>

            <p class="text-gray-700">
                Información
            </p>
            <NuxtLink to="/empresas" class="w-[170px] rounded-lg bg-emerald-400 px-3 py-2 text-md
                text-center font-bold text-gray-700 transition-colors duration-200 hover:bg-emerald-300
                sm:px-4 sm:text-base">
                Registrar Empresa
            </NuxtLink>
        </section>

    </main>
</template>
