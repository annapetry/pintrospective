json.extract! @user, :username, :description, :location, :id, :created_at, :updated_at

json.board_count @user.boards.size
json.pin_count @user.pins.size

json.boards @user.boards do |board|
  json.extract! board, :id, :title, :created_at, :updated_at
end

