class AddDefaultsToFollowsCount < ActiveRecord::Migration
  def change
    change_column :users,  :follows_count, :integer, default: 0
    change_column :boards, :follows_count, :integer, default: 0
  end
end
