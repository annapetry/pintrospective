class AddFollowerCountToBoardsUsers < ActiveRecord::Migration
  def change
    add_column :users, :followers_count, :integer
    add_column :boards, :followers_count, :integer
  end
end
