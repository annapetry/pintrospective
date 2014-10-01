json.extract! @user, :username, :description, :location, :id

json.url @user.image.url
json.board_count @user.boards.size
json.pin_count @user.pins.size
json.follower_count @user.followers.size
json.following_count @user.users_they_follow.size
json.image_id @user.image.id

json.following @user.users_they_follow do |followee|
  json.extract! followee, :id, :username
  json.url followee.image.url
end

json.followers @user.follows_from_user do |follower|
  json.extract! follower, :id
end

json.boards @user.boards do |board|
  json.extract! board, :id, :title, :user_id, :category

  json.pin_urls board.pins do |pin|
    json.url pin.image.url
  end
end
