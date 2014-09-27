class AddCountCacheForFollowersFollowees < ActiveRecord::Migration
  def change
    add_column :users, :follows_count, :integer
    add_column :boards, :follows_count, :integer
  end
end
