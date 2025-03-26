<template>
    <div class="carousel">
        <button class="nav-btn prev" @click="prev" :disabled="currentIndex === 0">&lt;</button>
        <div class="carousel-container">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <div v-for="chunk in chunks" :key="chunk[0].mal_id" class="carousel-slide">
                    <div class="cards-grid">
                        <AnimeCard v-for="anime in chunk" :key="anime.mal_id" :anime="anime" />
                    </div>
                </div>
            </div>
        </div>
        <button class="nav-btn next" @click="next" :disabled="currentIndex === chunks.length - 1">&gt;</button>
    </div>
</template>

<script>
import AnimeCard from './AnimeCard.vue'

export default {
    components: {
        AnimeCard
    },
    props: {
        animeList: {
            type: Array,
            required: true
        },
        itemsPerSlide: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    computed: {
        chunks() {
            const chunks = []
            for (let i = 0; i < this.animeList.length; i += this.itemsPerSlide) {
                chunks.push(this.animeList.slice(i, i + this.itemsPerSlide))
            }
            return chunks
        }
    },
    methods: {
        prev() {
            if (this.currentIndex > 0) {
                this.currentIndex--
            }
        },
        next() {
            if (this.currentIndex < this.chunks.length - 1) {
                this.currentIndex++
            }
        }
    }
}
</script>

<style scoped>
.carousel {
    position: relative;
    padding: 0 40px;
}

.carousel-container {
    overflow: hidden;
}

.carousel-track {
    display: flex;
    transition: transform 0.3s ease;
}

.carousel-slide {
    min-width: 100%;
    flex-shrink: 0;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem 0;
}

.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--accent-gradient);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 1;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(151, 71, 255, 0.2);
}

.nav-btn:hover:not(:disabled) {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 16px rgba(151, 71, 255, 0.3);
}

.nav-btn:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
    cursor: not-allowed;
    box-shadow: none;
}

.prev {
    left: 0;
}

.next {
    right: 0;
}

@media (max-width: 1024px) {
    .cards-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .cards-grid {
        grid-template-columns: 1fr;
    }
}
</style>
