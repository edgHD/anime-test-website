<template>
    <header class="header">
        <div class="container header-content">
            <div class="nav-section">
                <router-link to="/" class="logo">⭐ Logo</router-link>
                <nav>
                    <SearchBar class="search-section" />
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
import SearchBar from './SearchBar.vue'

export default {
    components: {
        SearchBar
    }
}
</script>

<style scoped>
.header {
    background: var(--background-card);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
}

.logo {
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 1.5rem;
}

nav {
    display: inline-block;
    margin-left: 2rem;
}

nav a {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}

.nav-section {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.search-section {
    flex: 1;
    max-width: 500px;
}

@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
        gap: 1rem;
    }

    .search-section {
        width: 100%;
        max-width: none;
    }
}
</style>
