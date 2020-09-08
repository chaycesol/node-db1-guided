const express = require('express');

// database access using knex
const db = require('../data/db-config.js'); //db is connection to database

const router = express.Router();

router.get('/', (req, res) => {
    //respond with a list of posts from database
    // db('posts') // alternative code, no need for the select or from
    // select * from posts;
    db.select('*')
    .from('posts')
    .then(posts => {
        res.status(200).json({ data: posts })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error.message})
    });
});

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    db("posts").where({ id: postId })
    .then(post => {
        res.status(200).json({ data: post })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error.message})
    })
});

router.post('/', (req, res) => {
    const post = req.body;
    db("posts")
    .insert(post)
    .returning('id') // do not exclude this line if you plan to support PostgreSQL
    .then(ids => {
        // the warining: .returning() is not suppored by sqlite3 and will not have any effect.
        // can safely be ignored when using SQLite
        // it will go away when using PostgreSQL
        res.status(201).json({ inserted: ids });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error.message})
    })

});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const postId = req.params.id;

    db('posts')
    .where({id: postId})
    //.where("id", "="", postId) //another way to write where
    .update(changes)
    .then(count => {
        if(count) {
            res.status(200).json({message: 'updated successfully'})
        } else {
            res.status(404).json({message: 'not found'})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error.message})
    })

});

router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    db('posts')
    .where({id: postId})
    //.where("id", "="", postId) //another way to write where
    .del() //delete instead of udpate
    .then(count => {
        if(count) {
            res.status(200).json({message: 'removed successfully'})
        } else {
            res.status(404).json({message: 'not found'})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error.message})
    })


});

module.exports = router;