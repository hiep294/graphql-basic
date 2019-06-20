module.exports = {
  author(parent, args, { db }, info) {
    // the returned value of this can be a selection of author info, not only authorId
    return db.users.find((user) => {
      return user.id === parent.authorId
    })
  },
  post(parent, args, { db }, info) {
    // the returned value of this can be post info, not only postId
    return db.posts.find(post => {
      return post.id === parent.postId
    })
  }
}