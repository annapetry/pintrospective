class Pin < ActiveRecord::Base
  validates :board, :description, presence: true

  belongs_to :board, counter_cache: true

  has_one(
    :user,
    through: :board,
    source: :user
  )

  has_one :image, as: :imageable, dependent: :destroy

  accepts_nested_attributes_for :image

  # default_scope { order(created_at: :asc) }
  default_scope { order(id: :asc) }
end
