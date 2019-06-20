module.exports = {
  author(parent, args, { db }, info) {
    // the returned value of this can be a selection of author info, not only authorId
    return db.users.find((user) => {
      return user.id === parent.authorId
    })
  },
  comments(parent, args, { db }, info) {
    const a = db.comments.filter(comment => {
      return parent.id === comment.postId
    })
    return a
  }
}