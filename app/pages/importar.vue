<script setup>
import { ref } from 'vue';

const fileName = ref('');
const headers = ref([]);
const rows = ref([]);
const error = ref('');
const loading = ref(false);

const importarExcel = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Reiniciar resultados anteriores
    fileName.value = file.name;
    headers.value = [];
    rows.value = [];
    error.value = '';
    loading.value = true;

    try {
        // Importar SheetJS
        const XLSX = await import('xlsx');

        // Leer el archivo
        const buffer = await file.arrayBuffer();

        // Interpretar el libro de Excel
        const workbook = XLSX.read(buffer, {
            type: 'array'
        });

        // Obtener la primera hoja
        const sheetName = workbook.SheetNames[0];

        if (!sheetName) {
            throw new Error('El archivo no contiene hojas.');
        }

        const worksheet = workbook.Sheets[sheetName];

        // Convertir la hoja en una matriz
        const data = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: '',
            raw: false
        }); 

        if (data.length === 0) {
            throw new Error('La hoja está vacía.');
        }

        // Primera fila = encabezados
        const headerRow = data[0];

        headers.value = headerRow.map((header, index) => {
            return String(header || `Columna ${index + 1}`);
        });

        // Filas restantes = información
        rows.value = data.slice(1).filter(row =>
            row.some(cell => cell !== '')
        );

    } catch (err) {
        console.error(err);
        error.value = err.message || 'No se pudo leer el archivo.';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <main class="min-h-screen bg-gray-100 p-6">
        <div class="mx-auto max-w-6xl space-y-6">

            <header>
                <h1 class="text-3xl font-bold text-gray-800">
                    Importar Excel
                </h1>

                <p class="mt-2 text-gray-600">
                    Selecciona un archivo Excel para visualizar su contenido.
                </p>
            </header>

            <!-- Selector de archivo -->
            <section class="rounded-xl bg-white p-6 shadow-sm">
                <label class="mb-3 block font-semibold text-gray-700">
                    Seleccionar archivo
                </label>

                <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    @change="importarExcel"
                    class="block w-full cursor-pointer rounded-lg border border-gray-300 p-3 text-sm"
                />

                <p class="mt-3 text-sm text-gray-500">
                    Formatos admitidos: XLSX, XLS y CSV.
                </p>

                <p v-if="fileName" class="mt-3 text-sm text-gray-700">
                    Archivo seleccionado:
                    <strong>{{ fileName }}</strong>
                </p>

                <p v-if="loading" class="mt-3 text-blue-600">
                    Procesando archivo...
                </p>

                <p v-if="error" class="mt-3 text-red-600">
                    {{ error }}
                </p>
            </section>

            <!-- Tabla -->
            <section
                v-if="headers.length"
                class="overflow-hidden rounded-xl bg-white shadow-sm"
            >
                <div class="flex flex-wrap items-center justify-between gap-2 border-b p-5">
                    <h2 class="text-xl font-semibold text-gray-800">
                        Datos importados
                    </h2>

                    <span class="text-sm text-gray-500">
                        {{ rows.length }} registros
                    </span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse text-left text-sm">
                        <thead class="bg-gray-100">
                            <tr>
                                <th
                                    v-for="(header, index) in headers"
                                    :key="index"
                                    class="whitespace-nowrap border-b px-5 py-3 font-semibold text-gray-700"
                                >
                                    {{ header }}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(row, rowIndex) in rows"
                                :key="rowIndex"
                                class="hover:bg-gray-50"
                            >
                                <td
                                    v-for="(_, colIndex) in headers"
                                    :key="colIndex"
                                    class="whitespace-nowrap border-b px-5 py-3 text-gray-600"
                                >
                                    {{ row[colIndex] ?? '' }}
                                </td>
                            </tr>

                            <tr v-if="rows.length === 0">
                                <td
                                    :colspan="headers.length"
                                    class="px-5 py-8 text-center text-gray-500"
                                >
                                    No hay registros para mostrar.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    </main>
</template>
