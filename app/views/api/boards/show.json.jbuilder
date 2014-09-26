json.extract! @board, :id, :title, :description, :user_id, :created_at, :updated_at

json.pin_count @board.pins.size
json.username @board.user.username

json.pins @board.pins do |pin|
  json.extract! pin, :id, :description, :board_id, :created_at, :updated_at
  json.extract! pin.image, :url
  json.extract! pin.user, :username
end

