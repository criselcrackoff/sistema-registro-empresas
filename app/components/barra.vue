
<template>
    <div
        id="nav-bar"
        class="relative z-10 flex w-full items-center justify-center
               px-3 py-3 shadow-md
               sm:justify-end sm:px-6 sm:py-4 md:py-6"
    >
        <nav
            class="flex w-full flex-wrap items-center justify-center gap-2
                   sm:w-auto sm:gap-3"
        >
            <NuxtLink
                to="/"
                class="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium
                       text-gray-700 transition-colors duration-200
                       hover:bg-gray-300
                       sm:px-4 sm:text-base"
            >
                Inicio
            </NuxtLink>

            <NuxtLink
                to="/empresas"
                class="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium
                       text-gray-700 transition-colors duration-200
                       hover:bg-gray-300
                       sm:px-4 sm:text-base"
            >
                Empresas
            </NuxtLink>

            <NuxtLink
                to="/contacto"
                class="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium
                       text-gray-700 transition-colors duration-200
                       hover:bg-gray-300
                       sm:px-4 sm:text-base"
            >
                Contacto
            </NuxtLink>

            <NuxtLink
                to="/ingreso"
                class="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-medium
                       text-gray-700 transition-colors duration-200
                       hover:bg-emerald-300
                       sm:px-4 sm:text-base"
            >
                Ingreso Funcionario
            </NuxtLink>
        </nav>
    </div>
</template>

<style scoped>
#nav-bar {
    background: linear-gradient(
        to bottom,
        white,
        #CCCCCC
    );
}
</style>
