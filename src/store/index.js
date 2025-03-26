import { defineStore } from 'pinia'
import { jikanApi } from '@/services/jikan'

export const useAnimeStore = defineStore('anime', {
  state: () => ({
    animeList: [],
    loading: false,
    error: null,
    popularAnime: [],
    seasonalAnime: [],
    searchQuery: '',
    currentAnime: null,
    episodes: [],
    relatedAnime: [],
  }),

  actions: {
    async searchAnime(query) {
      this.loading = true
      this.searchQuery = query
      try {
        this.animeList = await jikanApi.searchAnime(query)
      } catch (error) {
        this.error = error.message
        this.animeList = []
      } finally {
        this.loading = false
      }
    },

    async fetchPopularAnime() {
      this.loading = true
      try {
        this.popularAnime = await jikanApi.getPopularAnime()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchSeasonalAnime() {
      this.loading = true
      try {
        this.seasonalAnime = await jikanApi.getSeasonalAnime()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchAnimeById(id) {
      this.loading = true
      try {
        this.currentAnime = await jikanApi.getAnimeById(id)
      } catch (error) {
        this.error = error.message
        this.currentAnime = null
      } finally {
        this.loading = false
      }
    },

    async fetchAnimeEpisodes(id) {
      try {
        this.episodes = await jikanApi.getAnimeEpisodes(id)
      } catch (error) {
        this.error = error.message
        this.episodes = []
      }
    },

    async fetchAnimeRelations(id) {
      try {
        this.relatedAnime = await jikanApi.getAnimeRelations(id)
      } catch (error) {
        this.error = error.message
        this.relatedAnime = []
      }
    },
  },
})
