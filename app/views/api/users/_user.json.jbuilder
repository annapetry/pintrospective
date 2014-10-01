json.extract! user, :username, :id

json.url user.image.url
json.board_count user.boards.size
json.pin_count user.pins.size
