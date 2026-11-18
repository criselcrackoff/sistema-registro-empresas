<script setup>
import { Form, FormField } from '@primevue/forms';

const supabase = useSupabase();

const validarCorreo = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
        && correo.length <= 255;
};

// Validaciones del formulario
const resolver = ({ values }) => {
    const errors = {};

    // RUT
    if (!values.rut?.trim()) {
        errors.rut = [{ message: 'El RUT es obligatorio.' }];
    }

    if (!values.nombre?.trim()) {
        errors.nombre = [{ message: 'El nombre es obligatorio.' }];
    }

    if (!values.calle?.trim()) {
        errors.calle = [{ message: 'El nombre de la calle es obligatoria.' }];
    }

    if (!values.n_direccion?.trim()) {
        errors.n_direccion = [{ message: 'El número de dirección es requerido.' }];
    }

    if (!values.sector?.trim()) {
        errors.sector = [{ message: 'Lugar obligatorio.' }];
    }

    if (!values.telefono?.trim()) {
        errors.telefono = [{ message: 'Numero de teléfono obligatorio.' }];
    }

    if (!values.celular?.trim()) {
        errors.celular = [{ message: 'Número de celular obligatorio.' }];
    }

    // Correo
    if (!values.correo?.trim()) {
        errors.correo = [{ message: 'El correo es obligatorio.' }];
    } else if (!validarCorreo(values.correo)) {
        errors.correo = [{ message: 'Ingrese un correo válido.' }];
    }

    return {
        values,
        errors
    };
};

// Envío del formulario
const onFormSubmit = async (event) => {
    if (event.valid) {
        console.log('Datos del formulario:', event.values);
        const { data, error } = await supabase
            .from('test')
            .insert(event.values);

        if (error) {
            console.error('Error al insertas empresa:', error.message);
        } else {
            console.log('Empresas registradas:', data);
        }
    }
};
</script>

<template>
    <div class="h-screen flex flex-col overflow-hidden">
        <Background />

        <Barra />
        <main class="flex-1 min-h-0 flex justify-center items-center p-4 md:p-6 overflow-y-auto">
            <div
                class="w-full max-w-3xl flex flex-col justify-center items-center p-6 md:p-8"
                style="border-radius: 0.5rem; background-color: white;"
            >
                <h2 class="font-bold text-xl mb-6">Registro Empresas</h2>
                <Form :resolver="resolver" @submit="onFormSubmit"
                    class="flex flex-col gap-3 w-full">
                    <div class="grid grid-cols-1 md:grid-cols-6 gap-4 flex justify-center items-center">
                        <p class="text-sm md:col-start-1 md:col-span-6">Ingrese los siguientes datos.</p>

                        <FormField v-slot="$field" name="rut" initialValue="" class="md:col-span-3">
                            <Label for="rut">* Ingrese su rut</Label>
                            <InputText id="rut" placeholder="12.345.678-8" class="w-full" />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="nombre" initialValue="" class="md:col-span-3">
                            <Label for="nombre">* Ingrese su nombre o razón social</Label>
                            <InputText id="nombre" placeholder="Nombre o razón social" class="w-full" />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="calle" initialValue="" class="md:col-span-3">
                            <Label for="calle">* Ingrese nombre de calle</Label>
                            <InputText id="calle" placeholder="Nombre de calle" class="w-full" />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="n_direccion" initialValue="" class="md:col-span-3">
                            <Label for="n_direccion">* Ingrese su n° de dirección</Label>
                            <InputText id="n_direccion" placeholder="Número de dirección" class="w-full" />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="sector" initialValue="" class="md:col-span-2">
                            <Label for="sector">Sector, población o villa</Label>
                            <InputText id="sector" placeholder="Sector, población o villa" class="w-full" />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="telefono" initialValue="" class="md:col-span-2">
                            <Label for="telefono">* Ingrese su teléfono fijo</Label>
                            <InputText id="telefono" placeholder="Teléfono fijo" class="w-full" />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="celular" initialValue="" class="md:col-span-2">
                            <Label for="celular">* Ingrese número celular</Label>
                            <InputText id="celular" placeholder="Número de celular" class="w-full" />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="correo" initialValue="" class="md:col-span-6">
                            <Label for="correo">* Ingrese su correo</Label>
                            <InputText id="correo" placeholder="correo@correo.com" class="w-full" />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}</Message>
                        </FormField>
                        <span class="md:col-span-5" style="font-size: 12px;">los campos con * son obligatorios.</span>
                        <Button type="submit" severity="secondary" class="md:col-span-1">Enviar</Button>
                    </div>
                </Form>
            </div>
        </main>
    </div>
</template>
