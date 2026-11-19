<script setup>
</script>

<template>
    <div>
        <Background />
        <Barra />
    </div>

    <main class="grid grid-cols-1 md:grid-cols-1 gap-8 p-6 md:p-10">


        <section class="relative flex flex-col items-center justify-center gap-6
           min-h-[450px] rounded-xl shadow-xl p-8 bg-[url('/img/liceo1.jpg')] bg-no-repeat bg-cover bg-center
           text-center overflow-hidden">
            <!-- Capa oscura sobre la imagen -->
            <div class="absolute inset-0 bg-black/50"></div>

            <!-- Contenido -->
            <div class="relative z-10 flex flex-col items-center gap-6 max-w-5xl">

                <h1 class="text-3xl md:text-4xl font-bold text-white">
                    Conectamos empresas con el futuro profesional.
                </h1>

                <p class="text-xl md:text-3xl text-white">
                    Encuentra oportunidades de práctica profesional o registra tu empresa
                    para formar parte de nuestra red de colaboradores.
                </p>

                <NuxtLink to="/registro" class="w-[200px] h-[60px] mt-[4rem] rounded-lg bg-emerald-400 px-4 py-3
                    flex items-center justify-center text-center font-bold text-white text-lg
                    transition-colors duration-200 hover:bg-emerald-500 hover:ring-2 ring-white">
                    Registrar Empresa
                </NuxtLink>

            </div>
        </section>

        <h1 class="text-center md:text-3xl text-2xl font-bold">Nuestras especialidades</h1>

        <div class="w-full max-w flex flex-col md:mt-4">
            <div class="grid grid-cols-1 md:grid-cols-6 gap-3 justify-center items-center md:text-md">

                <div class="flex flex-wrap md:col-span-2 h-fit px-4 py-3 items-center shadow-xl"
                    style="border-radius: 0.5rem; background-color: #EAEAEA;">
                    <div class="bg-[url('/img/liceo2.jpg')] bg-cover bg-center rounded-full
                        w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-24 lg:h-24
                        shrink-0 mr-2">
                    </div>
                    <h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                        Contabilidad
                    </h1>
                </div>

                <div class="flex flex-wrap md:col-span-2 h-fit px-4 py-3 items-center shadow-xl"
                    style="border-radius: 0.5rem; background-color: #EAEAEA;">
                    <div class="bg-[url('/img/liceo3.jpg')] bg-cover bg-center rounded-full
                        w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-24 lg:h-24
                        shrink-0 mr-2">
                    </div>
                    <h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                        Administración
                    </h1>
                </div>

                <div class="flex flex-wrap md:col-span-2 h-fit px-4 py-3 items-center shadow-xl"
                    style="border-radius: 0.5rem; background-color: #EAEAEA;">
                    <div class="bg-[url('/img/liceo4.jpg')] bg-cover bg-center rounded-full
                        w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-24 lg:h-24
                        shrink-0 mr-2">
                    </div>
                    <h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                        Programación
                    </h1>
                </div>
            </div>
        </div>
    </main>
</template>
