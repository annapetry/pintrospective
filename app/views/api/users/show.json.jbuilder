json.extract! @user, :username, :description, :location, :id

json.url @user.image.url
json.boards_count @user.boards_count
json.pin_count @user.pins.size
json.follower_count @user.followers_count
json.following_count @user.follows_count
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

  image_count = 0
  json.pin_urls board.pins do |pin|
    image_count += 1
    if image_count > 5
      json.null!
    else
      json.url pin.image.url
    end
  end
end
