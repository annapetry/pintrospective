class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.string :description
      t.integer :board_id, null: false

      t.timestamps
    end
    add_index :pins, :board_id
  end
end
