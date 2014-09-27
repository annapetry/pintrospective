json.extract! @board, :id, :title, :description, :user_id, :created_at, :updated_at

json.pin_count @board.pins.size
json.username @board.user.username
json.follower_count @board.followers.size


json.pins @board.pins do |pin|
  json.partial! 'api/pins/pin', pin: pin
end

