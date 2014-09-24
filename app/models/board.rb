class Board < ActiveRecord::Base
  validates :title, :user, presence: true

  belongs_to :user

  has_many :pins

  has_many(
    :images,
    through: :pins,
    source: :image
  )
end
