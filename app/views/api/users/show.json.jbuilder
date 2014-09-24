json.extract! @user, :username, :description, :location, :id, :created_at, :updated_at


json.boards @user.boards do |board|
  json.extract! board, :id, :title, :created_at, :updated_at
end

