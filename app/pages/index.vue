<script setup>
</script>

<template>
    <div>
        <Background />
        <Barra />
    </div>

    <main class="grid grid-cols-1 md:grid-cols-1 gap-8 p-6 md:p-10">


        <section class="relative flex flex-col items-center justify-center gap-6
           min-h-[450px] rounded-xl shadow-xl p-8
           bg-[url('/img/liceo1.jpg')] bg-no-repeat bg-cover bg-center
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

                <NuxtLink to="/empresas" class="w-[200px] h-[60px] mt-[4rem] rounded-lg bg-emerald-400 px-4 py-3
                    flex items-center justify-center text-center font-bold text-white text-lg
                    transition-colors duration-200 hover:bg-emerald-300">
                    Registrar Empresa
                </NuxtLink>

            </div>
        </section>

    </main>
</template>
