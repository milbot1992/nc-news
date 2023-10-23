import axios from 'axios'

const newsAPI = axios.create({ baseURL : 'https://news-api-905c.onrender.com/api'})

export const getArticles = () => {
    return newsAPI.get('/articles', {params: {
        sort_by: 'created_at'
    }})
    .then((res) => {
        return res.data.articles
    })
}