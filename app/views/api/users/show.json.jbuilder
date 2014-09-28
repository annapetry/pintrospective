json.extract! @user, :username, :description, :location, :id, :created_at, :updated_at

json.url @user.image.url
json.board_count @user.boards.size
json.pin_count @user.pins.size
json.follower_count @user.followers.size
json.following_count @user.followees.where('followable_type = ?', 'User').size


json.boards @user.boards do |board|
  json.extract! board, :id, :title, :user_id, :created_at, :updated_at
end

