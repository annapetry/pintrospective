class AddCountCacheColumnsToUsersAndBoards < ActiveRecord::Migration
  def change
    add_column :users, :boards_count, :integer
    add_column :boards, :pins_count, :integer
  end
end

