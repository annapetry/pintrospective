json.extract! @board, :id, :title, :description, :user_id, :created_at, :updated_at

json.category @board.category
json.url @board.user.image.url
json.pin_count @board.pins.size
json.username @board.user.username
json.follower_count @board.followers.size

json.followers @board.followers.where({ user_id: current_user.id }) do |follower|
  json.extract! follower, :id
end

json.pins @board.pins do |pin|
  json.partial! 'api/pins/pin', pin: pin
end




