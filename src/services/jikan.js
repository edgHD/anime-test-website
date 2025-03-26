const BASE_URL = 'https://api.jikan.moe/v4'

export const jikanApi = {
  async getPopularAnime() {
    const response = await fetch(`${BASE_URL}/top/anime?filter=bypopularity`)
    const data = await response.json()
    return data.data
  },

  async getSeasonalAnime() {
    const response = await fetch(`${BASE_URL}/seasons/now`)
    const data = await response.json()
    return data.data
  },

  async searchAnime(query) {
    const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true`)
    const data = await response.json()
    return data.data
  },

  async getAnimeById(id) {
    const response = await fetch(`${BASE_URL}/anime/${id}/full`)
    const data = await response.json()
    return data.data
  },
}
