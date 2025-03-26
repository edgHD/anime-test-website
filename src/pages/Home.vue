<template>
    <MainLayout>
        <section v-if="!loading">
            <h2>Popular Anime</h2>
            <AnimeCarousel :animeList="popularAnime" />

            <h2>Current Season Anime</h2>
            <AnimeCarousel :animeList="seasonalAnime" />
        </section>
        <div v-else class="loading">Loading...</div>
    </MainLayout>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '@/store'
import MainLayout from '@/layouts/MainLayout.vue'
import SearchBar from '@/components/SearchBar.vue'
import AnimeCarousel from '@/components/AnimeCarousel.vue'

export default {
    components: {
        MainLayout,
        SearchBar,
        AnimeCarousel
    },
    setup() {
        const store = useAnimeStore()
        const { popularAnime, seasonalAnime, loading } = storeToRefs(store)

        store.fetchPopularAnime()
        store.fetchSeasonalAnime()

        return { popularAnime, seasonalAnime, loading }
    }
}
</script>

<style scoped>
h2 {
    margin: 2rem 0 1rem;
}

.loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
}
</style>
