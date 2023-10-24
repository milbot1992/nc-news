import axios from 'axios'

const newsAPI = axios.create({ baseURL : 'https://news-api-905c.onrender.com/api'})

export const getArticles = (topic) => {
    const query = {
        params: {
            sort_by: 'created_at',
        },
    };
    
    if (topic) {
        query.params.topic = topic;
    }
    
    return newsAPI.get('/articles', query)
    .then((res) => {
        return res.data.articles;
    })
    .catch((error) => {
        console.error(error);
    });
}

export const getArticleById = (article_id) =>{
    return newsAPI.get(`/articles/${article_id}`)
    .then(({data}) =>{
        return data.article;
    })
}

export const getCommentsById = (article_id) =>{
    return newsAPI.get(`/articles/${article_id}/comments`)
    .then(({data}) =>{
        return data.comments;
    })
}

export const patchLikes = (value, article_id) => {
    return newsAPI.patch(`/articles/${article_id}`, {inc_votes: value})
}