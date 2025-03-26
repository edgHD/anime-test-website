<template>
    <MainLayout>
        <div v-if="!loading">
            <div v-if="anime" class="page-layout">
                <div class="main-content">
                    <div class="anime-info">
                        <div class="image-section">
                            <img :src="anime.images.jpg.large_image_url" :alt="anime.title">
                            <div class="stats">
                                <div class="stat">
                                    <span class="label">Type:</span>
                                    <span class="value">{{ anime.type }}</span>
                                </div>
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
                    <div class="episodes-section">
                        <h2>{{ getContentTypeLabel }}</h2>
                        <div class="episodes-list">
                            <div v-if="isSingleEpisodeContent" class="episode-item">
                                <span class="episode-number">{{ anime.type }}</span>
                                <span class="episode-title">{{ anime.title }}</span>
                                <span class="episode-aired">{{ anime.aired?.string || 'TBA' }}</span>
                            </div>
                            <div v-else v-for="episode in episodes" :key="episode.mal_id" class="episode-item">
                                <span class="episode-number">Episode {{ episode.mal_id }}</span>
                                <span class="episode-title">{{ episode.title }}</span>
                                <span class="episode-aired">{{ episode.aired?.split('T')[0] || 'TBA' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="side-content">
                    <div class="related-section">
                        <h2>Related Anime</h2>
                        <div class="relations-grid">
                            <div v-for="relation in animeOnlyRelations" :key="relation.entry[0].mal_id"
                                class="relation-item">
                                <div class="relation-type">{{ relation.relation }}</div>
                                <div class="related-entries">
                                    <div v-for="entry in relation.entry" :key="entry.mal_id" class="related-anime"
                                        @click="navigateToAnime(entry.mal_id)">
                                        {{ entry.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
import { onMounted, ref, computed, watch } from 'vue'  // Add this import
import { useRouter } from 'vue-router'

const ALLOWED_TYPES = ['TV', 'Movie', 'OVA', 'ONA', 'TV Special', 'Special']

export default {
    components: {
        MainLayout
    },
    setup() {
        const store = useAnimeStore()
        const route = useRoute()
        const router = useRouter()
        const { currentAnime: anime, loading, episodes, relatedAnime } = storeToRefs(store)
        const showAllRelations = ref(false)
        const INITIAL_RELATIONS_COUNT = 4
        const expandedRelations = ref({})

        const isSingleEpisodeContent = computed(() => {
            return (
                anime.value &&
                ['Movie', 'OVA', 'ONA', 'Special', 'TV Special'].includes(anime.value.type) &&
                anime.value.episodes === 1
            );
        });

        const getContentTypeLabel = computed(() => {
            if (!anime.value) return 'Episodes';
            return isSingleEpisodeContent.value ? `${anime.value.type} Details` : 'Episodes';
        });

        onMounted(async () => {
            if (route.params.id) {
                await store.fetchAnimeById(route.params.id)
                if (anime.value) {
                    if (!isSingleEpisodeContent.value) {
                        await store.fetchAnimeEpisodes(route.params.id)
                    }
                    await store.fetchAnimeRelations(route.params.id)
                }
            }
        })

        const goToAnime = (id) => {
            route.push(`/anime/${id}`)
        }

        const visibleRelations = computed(() => {
            return showAllRelations.value
                ? relatedAnime.value
                : relatedAnime.value.slice(0, INITIAL_RELATIONS_COUNT)
        })

        const hasMoreRelations = computed(() => {
            return relatedAnime.value.length > INITIAL_RELATIONS_COUNT
        })

        const navigateToAnime = async (id) => {
            await router.push(`/anime/${id}`)
            // Refresh data for new anime
            if (route.params.id) {
                await store.fetchAnimeById(id)
                if (anime.value && anime.value.type !== 'Movie') {
                    await store.fetchAnimeEpisodes(id)
                }
                await store.fetchAnimeRelations(id)
                showAllRelations.value = false // Reset show more state
            }
        }

        const hasExpandedCategory = computed(() => {
            return Object.values(expandedRelations.value).some(value => value)
        })

        const toggleRelation = (relationType) => {
            expandedRelations.value[relationType] = !expandedRelations.value[relationType]
        }

        const animeOnlyRelations = computed(() => {
            if (!relatedAnime.value || !Array.isArray(relatedAnime.value)) return [];

            // Filter relations that contain anime entries
            return relatedAnime.value.filter(relation => {
                // Make sure entries exist
                if (!relation.entry || !Array.isArray(relation.entry)) return false;

                // Keep the relation if any entry is an anime of allowed type
                const validEntries = relation.entry.filter(entry =>
                    entry.type === 'anime' || ALLOWED_TYPES.includes(entry.type)
                );

                // Only keep relations that have valid entries
                return validEntries.length > 0;
            });
        });

        const getRelatedHeight = (relation) => {
            if (expandedRelations.value[relation.relation]) {
                return { height: 'auto' };
            }
            return { height: '120px' };
        };

        watch(() => route.params.id, () => {
            currentPage.value = 1; // Reset page when anime changes
        });

        return {
            anime,
            loading,
            episodes,
            relatedAnime,
            goToAnime,
            visibleRelations,
            hasMoreRelations,
            showAllRelations,
            navigateToAnime,
            expandedRelations,
            toggleRelation,
            hasExpandedCategory,
            animeOnlyRelations,
            getRelatedHeight,
            isSingleEpisodeContent,
            getContentTypeLabel
        }
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

.episodes-section {
    margin-top: 2rem;
    padding: 2rem;
    background: var(--background-card);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.episodes-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 1rem;
}

.episode-item {
    display: grid;
    grid-template-columns: 100px 1fr 120px;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

.episode-item:hover {
    background: rgba(255, 255, 255, 0.1);
}

.episode-number {
    color: var(--primary-color);
    font-weight: 500;
}

.episode-title {
    color: var(--text-primary);
}

.episode-aired {
    color: var(--text-secondary);
    text-align: right;
}

.movie-info {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.related-section {
    margin-top: 0;
    /* Remove top margin since it's now in a side column */
    padding: 2rem;
    background: var(--background-card);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.relations-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
}

.relation-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1rem;
}

.relation-type {
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.related-entries {
    max-height: 200px;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin: 0 -0.5rem;
}

.related-anime {
    padding: 0.75rem;
    margin: 0.25rem 0;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    color: var(--text-secondary);
}

.related-anime:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
}

.page-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
    align-items: start;
}

.main-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.side-content {
    position: sticky;
    top: 100px;
}

@media (max-width: 1200px) {
    .page-layout {
        grid-template-columns: 1fr;
    }

    .side-content {
        position: static;
    }

    .related-section {
        margin-top: 2rem;
    }

    .relations-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
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

    .episode-item {
        grid-template-columns: 80px 1fr;
    }

    .episode-aired {
        grid-column: 1 / -1;
        text-align: left;
    }
}
</style>
