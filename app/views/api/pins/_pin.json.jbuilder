json.extract! pin, :id, :description, :board_id, :created_at, :updated_at
json.extract! pin.image, :url
json.extract! pin.user, :username
json.pinner_id pin.user.id
json.pinner_img pin.user.image.url