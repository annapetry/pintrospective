json.extract! @board, :id, :title, :description, :user_id, :created_at, :updated_at

json.category @board.category
json.url @board.user.image.url
json.pin_count @board.pins.size
json.username @board.user.username
json.follower_count (@board.followers.count + @board.followers_through_user.count)

json.followers @board.follows.where({ user_id: current_user.id }) do |follower|
  json.extract! follower, :id
end

json.pins @board.pins do |pin|
  json.partial! 'api/pins/pin', pin: pin
end




