const posts = [
  {
    id: '1',
    title: 'title 1',
    body: '11or libero. Pellentesque vestibulum suscipit dolor, ac fringilla erat viverra non. Nulla ultricies ipsum et porta commodo. Proin laoreet felis eget elit eleifend interdum. Nulla hendrerit, risus vel ultrices accumsan, neque libero iaculis tortor, in euismod justo dolor quis mi. Nam bibendum sem nec justo maximus hendrerit. Nullam',
    published: false,
    authorId: '1'
  },
  {
    id: '2',
    title: 'title 2',
    body: 'or libero. Pellentesque vestibulum suscipit dolor, ac fringilla erat viverra non. Nulla ultricies ipsum et porta commodo. Proin laoreet felis eget elit eleifend interdum. Nulla hendrerit, risus vel ultrices accumsan, neque libero iaculis tortor, in euismod justo dolor quis mi. Nam bibendum sem nec justo maximus hendrerit. Nullam',
    published: true,
    authorId: '1'
  },
  {
    id: '3',
    title: 'title 3',
    body: 'or libero. Pellentesque vestibulum suscipit dolor, ac fringilla erat viverra non. Nulla ultricies ipsum et porta commodo. Proin laoreet felis eget elit eleifend interdum. Nulla hendrerit, risus vel ultrices accumsan, neque libero iaculis tortor, in euismod justo dolor quis mi. Nam bibendum sem nec justo maximus hendrerit. Nullam',
    published: true,
    authorId: '2'
  },
]

const users = [
  {
    id: '1',
    name: 'hiep1',
    email: 'hiep1@gmail.com',
    age: 11
  },
  {
    id: '2',
    name: 'hiep2',
    email: 'hiep2@gmail.com'
  },
  {
    id: '3',
    name: 'hiep3',
    email: 'hiep3@gmail.com'
  },
]

const comments = [
  {
    id: 'ats1',
    text: 'comment text 1',
    authorId: '1',
    postId: '1'
  },
  {
    id: 'ats2',
    text: 'comment text 2',
    authorId: '2',
    postId: '1'
  },
  {
    id: 'ats3',
    text: 'comment text 3',
    authorId: '1',
    postId: '2'
  },
  {
    id: 'ats4',
    text: 'comment text 4',
    authorId: '3',
    postId: '3'
  },
]

module.exports = { users, posts, comments }