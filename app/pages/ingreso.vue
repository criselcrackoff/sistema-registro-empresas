<script setup>
import { Form, FormField } from '@primevue/forms';

const supabase = useSupabase();
const loginError = ref('');
const isLoading = ref(false);


// Validaciones del formulario
const resolver = ({ values }) => {
    const errors = {};

    // Validar correo
    if (!values.correo?.trim()) {
        errors.correo = [{ message: 'El correo está vacío.' }];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
        errors.correo = [{ message: 'Eso no es un correo.' }];
    }

    // Validar contraseña
    if (!values.contrasena?.trim()) {
        errors.contrasena = [{ message: 'La contraseña está vacía.' }];
    }

    return {
        values,
        errors
    };
};

// Envío del formulario
const onFormSubmit = async (event) => {
    if (!event.valid) return;

    loginError.value = '';
    isLoading.value = true;

    try {
        const { correo, contrasena } = event.values;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: correo.trim(),
            password: contrasena
        });

        if (error) {
            loginError.value = 'Correo o contraseña incorrectos.';
            console.error(error);
            return;
        }

        await navigateTo('/');
    } catch (error) {
        loginError.value = 'No se pudo conectar con el servidor. Inténtelo nuevamente.';
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>


<template>
    <div class="h-screen flex flex-col overflow-hidden">
        <Background />

        <Barra />

        <main class="flex-1 min-h-0 flex justify-center items-center p-4 md:p-6 overflow-y-auto">
            <div class="w-full max-w-xl flex flex-col justify-center items-center p-6 md:p-8 shadow-xl"
                style="border-radius: 0.5rem; background-color: #EAEAEA;">
                <h2 class="font-bold text-xl mb-6">Ingreso Funcionario</h2>

                <Form :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
                    <div class="flex flex-col gap-4 w-full">

                        <p class="text-sm">Bienvenido funcionario, ingrese sus datos.</p>


                        <!-- Correo -->
                        <FormField v-slot="$field" name="correo" initialValue="">
                            <Label for="correo">* Correo electrónico</Label>

                            <InputText id="correo" v-bind="$field.props" type="email" placeholder="correo@correo.com"
                                class="w-full !py-3 !text-base" />

                            <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}
                            </Message>
                        </FormField>

                        <!-- Contraseña -->
                        <FormField v-slot="$field" name="contrasena" initialValue="">
                            <Label for="contrasena">* Contraseña</Label>

                            <InputText id="contrasena" v-bind="$field.props" type="password"
                                placeholder="Ingrese su contraseña" class="w-full !py-3 !text-base" />

                            <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                                {{ $field.error?.message }}
                            </Message>
                        </FormField>
                        
                        <Message v-if="loginError" severity="error" size="small" class="w-full">
                            {{ loginError }}
                        </Message>
                        
                        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <span class="text-xs text-gray-500">
                                Los campos con * son obligatorios.
                            </span>


                            <Button type="submit" severity="secondary" :loading="isLoading" :disabled="isLoading"
                                class="w-full sm:w-auto hover:ring-2 ring-emerald-400">
                                Entrar
                            </Button>
                        </div>

                    </div>
                </Form>
            </div>
        </main>
    </div>
</template>
