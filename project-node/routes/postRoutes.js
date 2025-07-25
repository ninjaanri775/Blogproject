const express = require('express');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const auth = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  try {
   
    const post = new Post({ 
      ...req.body, 
      author: req.user.id,
      tags: req.body.tags || []
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { q } = req.query; 

    const orConditions = [];

    if (q) {
      const regex = new RegExp(q, 'i'); 

      orConditions.push({ tags: { $regex: regex } });

      
      orConditions.push({ title: { $regex: regex } });

  
      const matchingUsers = await User.find({ name: regex }).select('_id');
      if (matchingUsers.length > 0) {
        const authorIds = matchingUsers.map(user => user._id);
        orConditions.push({ author: { $in: authorIds } });
      }
    }

    let filter = {};
    if (orConditions.length > 0) {
      filter = { $or: orConditions };
    }

    const posts = await Post.find(filter).populate('author', 'name email');
    res.json(posts);
  } catch (err) {
    next(err);
  }
});


router.put('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }


    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(t => t.trim());
    }

  
    Object.assign(post, req.body);

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });


    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.deleteOne();

    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
