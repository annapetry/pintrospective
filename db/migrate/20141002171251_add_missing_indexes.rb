class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :boards, :user_id
    add_index :follows, [:followable_id, :user_id]
    add_index :follows, [:followable_id, :followable_id]
    add_index :follows, [:followable_id, :followable_type]
    add_index :images, [:imageable_id, :imageable_type]
  end
end
