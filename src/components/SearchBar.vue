<template>
    <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search anime..." @keyup.enter="search">
        <button @click="search">Search</button>
    </div>
</template>

<script>
import { useAnimeStore } from '@/store'

export default {
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        search() {
            if (this.searchQuery.trim()) {
                const store = useAnimeStore()
                store.searchAnime(this.searchQuery)
                this.$router.push({
                    path: '/search',
                    query: { q: this.searchQuery }
                })
            }
        }
    }
}
</script>

<style scoped>
.search-bar {
    display: flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-primary);
    padding: 0.5rem;
    outline: none;
}

input::placeholder {
    color: var(--text-secondary);
}

button {
    background: var(--accent-gradient);
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

button:hover {
    opacity: 0.9;
}
</style>
