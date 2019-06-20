const uuid = require('uuid/v4')
module.exports = {
  createUser(parent, args, { db }, info) {
    // check email exists, if exists, the args not passed yet
    const emailTaken = db.users.some((user) => user.email === args.data.email)
    if (emailTaken) throw new Error('Email taken.')
    // create a new user if args passes
    const user = {
      id: uuid(),
      ...args.data
    }
    db.users.push(user)
    return user
  },
  createPost(parent, args, { db, pubsub }, info) {
    // the args passes if user exists
    const { authorId } = args.data
    const userExists = db.users.some(user => user.id === authorId)
    if (!userExists) throw new Error('User not found.')
    // create a new post if args passes
    const post = { id: uuid(), ...args.data }
    db.posts.push(post)
    if (post.published) pubsub.publish('post', {
      post: {
        mutation: 'CREATED',
        data: post
      }
    })
    return post
  },
  createComment(parent, args, { db, pubsub }, info) {
    // the args passes if user exists and post exists
    const { authorId, postId } = args.data
    const doesUserExist = db.users.some(user => user.id === authorId)
    if (!doesUserExist) throw new Error('User not found')
    const doesPostExist = db.posts.some(post => post.id === postId && post.published)
    if (!doesPostExist) throw new Error('Post not found')
    // create a new comment if the args passes
    const comment = { id: uuid(), ...args.data }
    db.comments.push(comment)
    pubsub.publish(`comment ${args.data.postId}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    })
    return comment
  },
  deleteUser(parent, args, { db }, info) {
    // check user, splice it, remove all documents which belong to user
    // (posts: also comments of other users in post , comments)
    const userIndex = db.users.findIndex(user => user.id === args.id)
    if (userIndex === -1) throw new Error('User not found.')
    const deleteUsers = db.users.splice(userIndex, 1)
    // deleting other documents
    db.posts = db.posts.filter((post) => {
      const match = post.authorId === args.id
      if (match) {
        //filter others comments out of this post
        db.comments = db.comments.filter(comment => comment.postId !== post.id)
      }
      return !match
    })
    return deleteUsers[0]
  },
  deletePost(parent, args, { db, pubsub }, info) {
    // check post, remove all comments, remove post , return post
    const postIndex = db.posts.findIndex((post) => post.id === args.id)
    if (postIndex === -1) throw new Error('Post not found.')
    // remove comments
    db.comments = db.comments.filter(comment => comment.postId !== args.id)
    // remove post and return
    const [post] = db.posts.splice(postIndex, 1)
    if (post.published) pubsub.publish('post', {
      post: {
        mutation: 'DELETED',
        data: post
      }
    })
    return post
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    // the args passes if comment input exists
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id)
    if (commentIndex === -1) throw new Error('Comment not found.')
    // if comment input exists, splice it in array, or can use filter
    const [deletedComment] = db.comments.splice(commentIndex, 1)
    // publish to subscription
    pubsub.publish(`comment ${deletedComment.postId}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    })
    // return in mutation
    return deletedComment
  },
  updateUser(parent, { id, data }, { db }, info) {
    // the args passes if user input exists
    const user = db.users.find((user) => user.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    // update if args passes
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email)
      if (emailTaken) {
        throw new Error('Email taken.')
      }
      user.email = data.email
    }
    if (typeof data.name === 'string') {
      user.name = data.name
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
  },
  updatePost(parent, { id, data: { title, body, published } }, { db, pubsub }, info) {
    // verify post exist
    const post = db.posts.find(post => post.id === id)
    if (!post) throw new Error('Post not found')
    const originalPost = { ...post }

    // check then update  
    if (typeof title === 'string') post.title = title
    if (typeof body === 'string') post.body = body

    if (typeof published === 'boolean') {
      post.published = published
      if (originalPost.published && !post.published) {
        // deleted => mean that will hide in the screen
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: post
          }
        })
      } else if (!originalPost.published && post.published) {
        // created => means that will show in the screen
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        })
      }
    } else if (post.published) {
      // updated
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      })
    }

    // return
    return post
  },
  updateComment(parent, { id, data: { text } }, { db, pubsub }, info) {
    // verify comment exist
    const comment = db.comments.find(comment => comment.id === id)
    if (!comment) throw new Error('Comment not found')
    // update props
    if (typeof text === 'string') comment.text = text
    // publish subscription
    pubsub.publish(`comment ${comment.postId}`, {
      comment: {
        mutation: "UPDATED",
        data: comment
      }
    })
    // return and test
    return comment
  }
}