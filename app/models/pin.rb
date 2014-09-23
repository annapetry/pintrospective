class Pin < ActiveRecord::Base
  validates :board, :description, presence: true

  belongs_to :board

  has_one(
    :user,
    through: :board,
    source: :user
  )

  has_one :image, as: :imageable, dependent: :destroy
end
