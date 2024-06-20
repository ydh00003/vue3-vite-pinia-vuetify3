import axios from 'axios'

const config = {
  baseUrl: 'https://api.hnpwa.com/v0/'
}

function fetchNewsList(page: number) {
  return axios.get(`${config.baseUrl}news/${page}.json`)
}
function fetchAskList(page: number) {
  return axios.get(`${config.baseUrl}ask/${page}.json`)
}
export { fetchNewsList, fetchAskList }
