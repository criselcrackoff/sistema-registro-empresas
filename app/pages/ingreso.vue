
<script setup>
import { Form, FormField } from '@primevue/forms';

// Validaciones del formulario
const resolver = ({ values }) => {
    const errors = {};

    if (!values.correo?.trim()) {
        errors.correo = [{ message: 'El correo es obligatorio.' }];
    }

    if (!values.nombre?.trim()) {
        errors.nombre = [{ message: 'La contraseña es obligatoria.' }];
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
    }
};
</script>

<template>
    <div class="h-screen flex flex-col overflow-hidden">
        <Background />

        <Barra />

        <main class="flex-1 min-h-0 flex justify-center items-center p-4 md:p-6 overflow-y-auto">
            <div
                class="w-full max-w-xl flex flex-col justify-center items-center p-6 md:p-8"
                style="border-radius: 0.5rem; background-color: white;"
            >
                <h2 class="font-bold text-xl mb-6">Ingreso Funcionario</h2>

                <Form
                    :resolver="resolver"
                    @submit="onFormSubmit"
                    class="flex flex-col gap-4 w-full"
                >
                    <div class="flex flex-col gap-4 w-full">

                        <p class="text-sm">Bienvenido funcionario, ingrese sus datos.</p>

                        <FormField v-slot="$field" name="correo" initialValue="">
                            <Label for="correo">* Correo electrónico</Label>

                            <InputText
                                id="correo"
                                v-bind="$field.props"
                                type="email"
                                placeholder="correo@correo.com"
                                class="w-full !py-3 !text-base"
                            />

                            <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}
                            </Message>
                        </FormField>

                        <FormField v-slot="$field" name="nombre" initialValue="">
                            <Label for="nombre">* Contraseña</Label>

                            <InputText
                                id="nombre"
                                v-bind="$field.props"
                                type="password"
                                placeholder="Ingrese su contraseña"
                                class="w-full !py-3 !text-base"
                            />

                            <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}
                            </Message>
                        </FormField>

                        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
                            <span class="text-xs text-gray-500">
                                los campos con * son obligatorios.
                            </span>

                            <Button type="submit" severity="secondary" class="w-full sm:w-auto">
                                Entrar
                            </Button>
                        </div>

                    </div>
                </Form>
            </div>
        </main>
    </div>
</template>
