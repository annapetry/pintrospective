json.extract! @board, :id, :title, :description, :user_id, :created_at, :updated_at


json.pins @board.pins do |pin|
  json.extract! pin, :id, :description, :board_id, :created_at, :updated_at
end