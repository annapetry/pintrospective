User.create!([
  {username: "John", password_digest: "$2a$10$uqjsK/BjpvrpyChbt0F.OefjJJ9LVLCZFTGOROQbP2p7zwgxtDvXu", session_token: "fFb0EvfBAuEw2xKB5IOjKQ", description: "My love", location: "Beside me!", boards_count: 1},
  {username: "PlusUltra Petry", password_digest: "$2a$10$r2GJNBcnILwmpcsh3URy0uGk8N40KRtIE8o.oQ1IcvEYrl4SNgBHG", session_token: "SeEU3ZxKaqUaj0BhMlm1CQ", description: "I'm a designer, a maker, and a do-it-myselfer.", location: "San Francisco, CA", boards_count: -4}
])

Board.create!([
  {user_id: 1, description: "", title: "asdasd", pins_count: 4},
  {user_id: 1, description: "aSas", title: "asdasd", pins_count: 0},
  {user_id: 1, description: "", title: "asdasd", pins_count: 4},
  {user_id: 1, description: "", title: "First Board", pins_count: 3},
  {user_id: 2, description: "ASdasd", title: "asdasd", pins_count: 0}
])

Pin.create!([
  {description: "A pin!", board_id: 32},
  {description: "Another pin!", board_id: 32},
  {description: "Another pinnnn!", board_id: 32},
  {description: "asddasdasd", board_id: 34},
  {description: "asdasd", board_id: 34},
  {description: "asdasd", board_id: 34},
  {description: "patterns\r\n", board_id: 36},
  {description: "Nothing but patterns", board_id: 36},
  {description: "For days", board_id: 36},
  {description: "asdasd", board_id: 34},
  {description: "asdasd", board_id: 36}
])
Image.create!([
  {url: "https://www.filepicker.io/api/file/6co3j6VRRgiCgrQTZAGh", imageable_id: nil, imageable_type: nil},
  {url: "https://www.filepicker.io/api/file/KNzHunZkRl2gTZNSNYR1", imageable_id: nil, imageable_type: nil},
  {url: "https://img1.etsystatic.com/024/0/5183490/il_570xN.478581679_3gu9.jpg", imageable_id: 20, imageable_type: "Pin"},
  {url: "https://img1.etsystatic.com/024/0/5183490/il_570xN.478581679_3gu9.jpg", imageable_id: 21, imageable_type: "Pin"},
  {url: "https://img1.etsystatic.com/024/0/5183490/il_570xN.478581679_3gu9.jpg", imageable_id: 22, imageable_type: "Pin"},
  {url: "asdf", imageable_id: nil, imageable_type: "Pin"},
  {url: "asdasdasd", imageable_id: 29, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 30, imageable_type: "Pin"},
  {url: "aaaaaadasd", imageable_id: 31, imageable_type: "Pin"},
  {url: "asgdjasd", imageable_id: 32, imageable_type: "Pin"},
  {url: "asdasdasd", imageable_id: 35, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 36, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 37, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 38, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 39, imageable_type: "Pin"},
  {url: "asdasdasd", imageable_id: 40, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 41, imageable_type: "Pin"},
  {url: "asdasd", imageable_id: 42, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/90/12/8f/90128f980cf1945079f9fae42155d16b.jpg", imageable_id: 47, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/90/12/8f/90128f980cf1945079f9fae42155d16b.jpg", imageable_id: 48, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/90/12/8f/90128f980cf1945079f9fae42155d16b.jpg", imageable_id: 49, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 50, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 51, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 52, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 53, imageable_type: "Pin"},
  {url: "http://media-cache-ak0.pinimg.com/736x/f2/ba/77/f2ba77003837fc543250169c9a0e4386.jpg", imageable_id: 54, imageable_type: "Pin"}
])

