class AddIndexToCategory < ActiveRecord::Migration
  def change
      add_index :boards, :category
  end
end
