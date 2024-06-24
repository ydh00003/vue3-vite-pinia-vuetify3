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

function fetchJobsList(page: number) {
  return axios.get(`${config.baseUrl}jobs/${page}.json`)
}

function fetchUserInfo(userName: string) {
  return axios.get(`${config.baseUrl}user/${userName}.json`)
}

function fetchItemInfo(id: string) {
  return axios.get(`${config.baseUrl}item/${id}.json`)
}

export { fetchNewsList, fetchAskList, fetchJobsList, fetchUserInfo, fetchItemInfo }
