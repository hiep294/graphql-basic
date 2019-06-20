module.exports = {
  comments(parent, args, { db }) {
    return db.comments
  }, 
  posts(parent, args, { db }) {
    const keyword = args.query
    // return all posts if keyword is null
    if (!keyword) return db.posts    
    // particular posts whose titles or bodies include the keyword
    return db.posts.filter((post) => {
      const isTitleMatched = post.title.includes(keyword.toLowerCase())
      const isBodyMatched = post.body.includes(keyword.toLowerCase())
      return isTitleMatched || isBodyMatched
    })
  },
  users(parent, args, { db }, info) {
    // return all posts if query is null
    if (!args.query) {
      return db.users
    }
    // if query is null, return all posts whose names include query keyword
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  grades(parent, args) {
    return [6, 7]
  },
  sum(parent, args) {
    const numbers = args.numbers
    if (numbers.length === 0) {
      return 0
    }
    return numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
  },
  greeting(parent, args, { db }, info) {
    if (args.name && args.position) {
      return `Hello, ${args.name}! You are my favourite ${args.position}`
    } else {
      return 'Hello'
    }
  },
  me() {
    return {
      id: 'asdfasdf',
      name: 'Hiep',
      email: 'hiep@gmail.com',
      age: 11
    }
  },
  post() {
    return {
      id: '1230123',
      title: 'Demo post',
      body: 'Life is painful, it is basic',
      published: true
    }
  }
}