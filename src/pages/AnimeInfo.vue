<template>
    <MainLayout>
        <div v-if="!loading">
            <div v-if="anime" class="anime-info">
                <div class="image-section">
                    <img :src="anime.images.jpg.large_image_url" :alt="anime.title">
                    <div class="stats">
                        <div class="stat">
                            <span class="label">Score:</span>
                            <span class="value">{{ anime.score || 'N/A' }}/10</span>
                        </div>
                        <div class="stat">
                            <span class="label">Episodes:</span>
                            <span class="value">{{ anime.episodes || 'N/A' }}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Status:</span>
                            <span class="value">{{ anime.status }}</span>
                        </div>
                    </div>
                </div>
                <div class="details">
                    <h1>{{ anime.title }}</h1>
                    <h2 class="japanese-title">{{ anime.title_japanese }}</h2>
                    <div class="genres">
                        <span v-for="genre in anime.genres" :key="genre.mal_id" class="genre">
                            {{ genre.name }}
                        </span>
                    </div>
                    <p class="synopsis">{{ anime.synopsis }}</p>
                </div>
            </div>
            <div v-else class="error">Anime not found</div>
        </div>
        <div v-else class="loading">Loading...</div>
    </MainLayout>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'  // Add this import
import { useAnimeStore } from '@/store'
import MainLayout from '@/layouts/MainLayout.vue'
import { onMounted } from 'vue'  // Add this import

export default {
    components: {
        MainLayout
    },
    setup() {
        const store = useAnimeStore()
        const route = useRoute()
        const { currentAnime: anime, loading } = storeToRefs(store)

        onMounted(() => {
            if (route.params.id) {
                store.fetchAnimeById(route.params.id)
            }
        })

        return { anime, loading }
    }
}
</script>

<style scoped>
.anime-info {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    padding: 2rem;
    background: var(--background-card);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.image-section img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.stats {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 1.5rem;
}

.stat {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: var(--text-secondary);
}

.value {
    color: var(--text-primary);
    font-weight: 500;
}

.japanese-title {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

.genres {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 1rem 0;
}

.genre {
    background: var(--accent-gradient);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
}

.synopsis {
    color: var(--text-secondary);
    line-height: 1.8;
}

@media (max-width: 768px) {
    .anime-info {
        grid-template-columns: 1fr;
    }

    .image-section img {
        max-width: 300px;
        margin: 0 auto;
        display: block;
    }
}
</style>
