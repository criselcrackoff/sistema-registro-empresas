export const useAuth = () => {
    const supabase = useSupabase();

    const user = useState('auth-user', () => null);
    const initialized = useState('auth-initialized', () => false);

    const initAuth = async () => {
        if (initialized.value) return;

        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error('Error recuperando sesión:', error);
        }

        user.value = session?.user ?? null;
        initialized.value = true;

        supabase.auth.onAuthStateChange((_event, session) => {
            user.value = session?.user ?? null;
        });
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error cerrando sesión:', error);
            return false;
        }

        user.value = null;
        await navigateTo('/ingreso');

        return true;
    };

    return {
        user,
        initialized,
        initAuth,
        logout
    };
};
