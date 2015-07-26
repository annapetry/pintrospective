User.create!([
  { username: "John",
    password: 'password',
    description: "My love",
    location: "Beside me!",
    boards_count: 3,
    image: Image.new({url: 'http://www.annapetry.com/assets/petry.jpg'})
  },
  { username: "PlusUltra Petry",
    password: 'password',
    description: "I'm a designer, a maker, and a do-it-myselfer.",
    location: "San Francisco, CA",
    boards_count: 2,
    image: Image.new({url: 'http://www.annapetry.com/assets/petry.jpg'})
  }
])

Board.create!([
  {user_id: 1, description: "", title: "asdasd", pins_count: 3},
  {user_id: 1, description: "aSas", title: "asdasd", pins_count: 3},
  {user_id: 1, description: "", title: "asdasd", pins_count: 2},
  {user_id: 2, description: "", title: "First Board", pins_count: 1},
  {user_id: 2, description: "ASdasd", title: "asdasd", pins_count: 2}
])

Pin.create!([
  {description: "A pin!", board_id: 1},
  {description: "Another pin!", board_id: 1},
  {description: "Another pinnnn!", board_id: 1},
  {description: "asddasdasd", board_id: 2},
  {description: "asdasd", board_id: 2},
  {description: "asdasd", board_id: 2},
  {description: "patterns", board_id: 3},
  {description: "Nothing but patterns", board_id: 3},
  {description: "For days", board_id: 4},
  {description: "asdasd", board_id: 5},
  {description: "asdasd", board_id: 5}
])
Image.create!([
  {url: "https://www.filepicker.io/api/file/6co3j6VRRgiCgrQTZAGh", imageable_id: 1, imageable_type: "Pin"},
  {url: "https://www.filepicker.io/api/file/KNzHunZkRl2gTZNSNYR1", imageable_id: 2, imageable_type: "Pin"},
  {url: "https://img1.etsystatic.com/024/0/5183490/il_570xN.478581679_3gu9.jpg", imageable_id: 3, imageable_type: "Pin"},
  {url: "https://img1.etsystatic.com/024/0/5183490/il_570xN.478581679_3gu9.jpg", imageable_id: 4, imageable_type: "Pin"},
  {url: "https://img1.etsystatic.com/024/0/5183490/il_570xN.478581679_3gu9.jpg", imageable_id: 5, imageable_type: "Pin"},
  {url: "asdf", imageable_id: 6, imageable_type: "Pin"},
  {url: "asdasdasd", imageable_id: 7, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 8, imageable_type: "Pin"},
  {url: "aaaaaadasd", imageable_id: 9, imageable_type: "Pin"},
  {url: "asgdjasd", imageable_id: 10, imageable_type: "Pin"},
  {url: "asdasdasd", imageable_id: 11, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 12, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 13, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 14, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 15, imageable_type: "Pin"},
  {url: "asdasdasd", imageable_id: 16, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 17, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 18, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/90/12/8f/90128f980cf1945079f9fae42155d16b.jpg", imageable_id: 19, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/90/12/8f/90128f980cf1945079f9fae42155d16b.jpg", imageable_id: 20, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/90/12/8f/90128f980cf1945079f9fae42155d16b.jpg", imageable_id: 21, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 22, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 23, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 24, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 25, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 26, imageable_type: "Pin"}
])
