<template>
    <MainLayout>
        <div v-if="!loading">
            <h2 v-if="searchQuery">Search Results for "{{ searchQuery }}"</h2>
            <div v-if="animeList.length" class="results-grid">
                <AnimeCard v-for="anime in animeList" :key="anime.mal_id" :anime="anime" />
            </div>
            <div v-else class="no-results">
                No results found
            </div>
        </div>
        <div v-else class="loading">Searching...</div>
    </MainLayout>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '@/store'
import MainLayout from '@/layouts/MainLayout.vue'
import AnimeCard from '@/components/AnimeCard.vue'

export default {
    components: {
        MainLayout,
        AnimeCard
    },
    setup() {
        const store = useAnimeStore()
        const { animeList, loading, searchQuery } = storeToRefs(store)

        // Get search query from URL and perform search
        const query = new URLSearchParams(window.location.search).get('q')
        if (query) {
            store.searchAnime(query)
        }

        return { animeList, loading, searchQuery }
    }
}
</script>

<style scoped>
.results-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    margin: 2rem auto;
    max-width: 900px;
}

/* Tablets (2 columns) */
@media (min-width: 600px) {
    .results-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Medium devices (3 columns) */
@media (min-width: 900px) {
    .results-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Large devices (4 columns) */
@media (min-width: 1200px) {
    .results-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.no-results {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
}
</style>
