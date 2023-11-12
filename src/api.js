import axios from 'axios'

const newsAPI = axios.create({ baseURL : 'https://news-api-905c.onrender.com/api'})

export const getTopics = () => {
    return newsAPI.get('/topics')
    .then ((res) => {
        return res.data.topics
    })
}

export const getUsers = () => {
    return newsAPI.get('/users')
    .then ((res) => {
        return res.data.users
    })
}

export const getArticles = (topic, sort_by, order, currentPage) => {

    const query = {
        params: {
            sort_by: sort_by,
            order: order,
            p: currentPage
        },
    };
    
    if (topic) {
        query.params.topic = topic;
    }
    
    return newsAPI.get('/articles', query)
    .then((res) => {
        const total_count = res.data.total_count
        const articles = res.data.articles
        return {articles, total_count}
    })
}

export const getArticleById = (article_id) =>{
    return newsAPI.get(`/articles/${article_id}`)
    .then(({data}) =>{
        return data.article;
    })
}

export const getCommentsById = (article_id, page) =>{
    const query = {
        params: {
            p: page
        },
    };
    return newsAPI.get(`/articles/${article_id}/comments`, query)
    .then(({data}) =>{
        const comments = data.comments

        return data.comments;
    })
}

export const deleteComment = (comment_id) => {
    return newsAPI.delete(`/comments/${comment_id}`)
}

export const patchLikes = (value, article_id) => {
    return newsAPI.patch(`/articles/${article_id}`, {inc_votes: value})
}

export const postComment = (article_id, commentToBeAdded) => {
    return newsAPI.post(`/articles/${article_id}/comments`, commentToBeAdded)
}