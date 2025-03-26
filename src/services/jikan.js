const BASE_URL = 'https://api.jikan.moe/v4'
const ALLOWED_TYPES = ['TV', 'Movie', 'OVA', 'ONA', 'TV Special', 'Special']

const filterAllowedTypes = (animeList) => {
  return animeList.filter((anime) => ALLOWED_TYPES.includes(anime.type))
}

export const jikanApi = {
  async getPopularAnime() {
    const response = await fetch(`${BASE_URL}/top/anime?filter=bypopularity`)
    const data = await response.json()
    return filterAllowedTypes(data.data)
  },

  async getSeasonalAnime() {
    const response = await fetch(`${BASE_URL}/seasons/now`)
    const data = await response.json()
    return filterAllowedTypes(data.data)
  },

  async searchAnime(query) {
    const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true`)
    const data = await response.json()
    return filterAllowedTypes(data.data)
  },

  async getAnimeById(id) {
    const response = await fetch(`${BASE_URL}/anime/${id}/full`)
    const data = await response.json()
    return data.data
  },

  async getAnimeEpisodes(id) {
    const response = await fetch(`${BASE_URL}/anime/${id}/episodes`)
    const data = await response.json()
    return data.data
  },

  async getAnimeRelations(id) {
    try {
      const response = await fetch(`${BASE_URL}/anime/${id}/relations`)
      const data = await response.json()
      if (!data.data) return []

      // Filter relations that are anime-related
      return data.data.filter((relation) =>
        relation.entry?.some(
          (entry) => entry.type === 'anime' || ALLOWED_TYPES.includes(entry.type),
        ),
      )
    } catch (error) {
      console.error('Error fetching relations:', error)
      return []
    }
  },
}
