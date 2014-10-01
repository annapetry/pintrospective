class Board < ActiveRecord::Base
  validates :title, :user, presence: true

  belongs_to :user, counter_cache: true

  has_many :pins, dependent: :destroy

  has_many(
    :images,
    through: :pins,
    source: :image
  )

  has_many(
    :follows,
    class_name: "Follow",
    foreign_key: "followable_id"
  )

  has_many(
    :followers,
    through: :follows,
    source: :user
  )

  default_scope { order(created_at: :asc) }
end
