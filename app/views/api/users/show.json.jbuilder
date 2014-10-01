json.extract! @user, :username, :description, :location, :id

json.url @user.image.url
json.board_count @user.boards.size
json.pin_count @user.pins.size
json.follower_count @user.followers.size
json.following_count @user.users_they_follow.size
json.image_id @user.image.id

json.followers @user.follows_from_user.where({ followable_id: current_user.id }) do |follower|
  json.extract! follower, :id
end

json.boards @user.boards do |board|
  json.extract! board, :id, :title, :user_id, :category

  json.pin_urls board.pins do |pin|
    json.url pin.image.url
  end
end

