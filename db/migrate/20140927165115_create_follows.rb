class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :user_id, null: false
      t.references :followable, polymorphic: true

      t.timestamps
    end
    add_index :follows, :user_id
  end
end
