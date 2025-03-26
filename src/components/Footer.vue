<template>
    <footer class="footer">
        <div class="container footer-content">
            <div class="footer-section">
                <h3>About</h3>
                <p>Your go-to anime discovery platform. Find the best anime shows and movies.</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <nav>
                    <router-link to="/">Home</router-link>
                    <router-link to="/search">Search</router-link>
                </nav>
            </div>
            <div class="footer-section">
                <h3>Credits</h3>
                <p>Data provided by <a href="https://jikan.moe/" target="_blank" rel="noopener">Jikan API</a></p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2024 Anime Website. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background: var(--background-card);
    color: var(--text-secondary);
    margin-top: 4rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 3rem 1rem;
}

.footer-section h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.footer-section nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.footer-section a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-section a:hover {
    color: var(--primary-color);
}

.footer-bottom {
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem 0;
    text-align: center;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .footer-section nav {
        align-items: center;
    }
}
</style>
