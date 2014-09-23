class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.integer :user_id, null: false
      t.text  :description
      t.string :title, null: false

      t.timestamps
    end
  end
end
