json.extract! board, :id, :title, :description, :user_id, :created_at, :updated_at
json.user_url board.user.image.url
json.pin_count board.pins.size
json.username board.user.username

json.pin_urls board.pins do |pin|
  json.url pin.image.url
end


