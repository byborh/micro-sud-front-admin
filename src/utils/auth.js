export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
}

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
}

export const logout = async () => {
    const token = localStorage.getItem('authToken');
    if(!token) return;

    try {
        const res = await fetch('http://localhost:3000/api/v0.0.2/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });

        if(!res.ok) {
            console.error('Une erreur est survenue lors de la déconnexion');
        }

        localStorage.removeItem('authToken');
        
        // Redirection vers la page d'accueil admin
        this.$router.push('/');
    } catch(error) {
        console.error('Erreur lors de la déconnexion:', error);
    }
}