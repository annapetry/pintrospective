class Board < ActiveRecord::Base
  validates :title, :user, presence: true

  belongs_to(
    :user,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id,
    counter_cache: true
  )

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

  has_many(
    :followers_through_user,
    through: :user,
    source: :followers
  )

  default_scope { order(created_at: :asc) }
end
