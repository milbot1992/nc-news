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

export const getArticles = (topic, sort_by, order) => {

    const query = {
        params: {
            sort_by: sort_by,
            order: order
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
        console.log(error);
    });
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
    console.log(article_id);
    return newsAPI.post(`/articles/${article_id}/comments`, commentToBeAdded)
}