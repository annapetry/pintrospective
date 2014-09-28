class AddCategoryToBoard < ActiveRecord::Migration
  def change
    add_column :boards, :category, :string
  end
end
