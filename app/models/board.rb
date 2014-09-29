class Board < ActiveRecord::Base
  validates :title, :user, presence: true

  belongs_to :user, counter_cache: true

  has_many :pins, dependent: :destroy

  has_many(
    :images,
    through: :pins,
    source: :image
  )

  has_many :followers, class_name: "Follow", foreign_key: "followable_id"

  default_scope { order(created_at: :asc) }
end
