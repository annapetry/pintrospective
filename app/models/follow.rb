class Follow < ActiveRecord::Base
  belongs_to :user, counter_cache: true
  belongs_to :board, counter_cache: true

  belongs_to :followable, :polymorphic => true, counter_cache: true

  validates :user, :followable, presence: true
end
