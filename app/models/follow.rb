class Follow < ActiveRecord::Base
  belongs_to :user
  belongs_to :followable, :polymorphic => true

  validates :user, :followable, presence: true
end
