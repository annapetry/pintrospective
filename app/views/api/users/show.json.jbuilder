json.extract! @user, :username, :description, :location, :id

json.url @user.image.url
json.boards_count @user.boards.count
json.pin_count @user.pins.size
json.follower_count @user.followers.count
json.following_count @user.users_they_follow.count
json.image_id @user.image.id

user_count = 0
json.following @user.users_they_follow do |followee|
  user_count += 1
  if user_count > 3
    json.null!
  else
    json.extract! followee, :id, :username
    json.url followee.image.url
  end
end

json.current_follow @user.current_follow(current_user.id)

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
