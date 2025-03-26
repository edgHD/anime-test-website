<template>
    <div class="anime-card" @click="goToAnimeDetails">
        <img :src="anime.images.jpg.image_url" :alt="anime.title">
        <div class="content">
            <h3>{{ anime.title }}</h3>
            <div class="info">
                <span>Score: {{ anime.score || 'N/A' }}</span>
                <span>Episodes: {{ anime.episodes || 'N/A' }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        anime: {
            type: Object,
            required: true
        }
    },
    methods: {
        goToAnimeDetails() {
            this.$router.push(`/anime/${this.anime.mal_id}`)
        }
    }
}
</script>

<style scoped>
.anime-card {
    background: var(--background-card);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    max-width: 200px;
    margin: 0 auto;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.anime-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(151, 71, 255, 0.2);
    border-color: var(--primary-color);
}

.anime-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    border-radius: 12px;
}

.anime-card:hover::before {
    opacity: 0.1;
}

img {
    width: 100%;
    aspect-ratio: 2/3;
    height: auto;
    object-fit: cover;
    object-position: center top;
}

.content {
    padding: 1rem;
    background: var(--background-card);
}

h3 {
    color: var(--text-primary);
    font-size: 0.95rem;
    margin: 0 0 0.5rem;
    line-height: 1.4;
}

.info {
    color: var(--text-secondary);
    font-size: 0.85rem;
}
</style>
