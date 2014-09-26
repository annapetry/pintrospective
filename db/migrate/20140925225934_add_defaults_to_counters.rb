class AddDefaultsToCounters < ActiveRecord::Migration
  def change
    change_column :users,  :boards_count, :integer, default: 0
    change_column :boards, :pins_count, :integer, default: 0
  end
end
