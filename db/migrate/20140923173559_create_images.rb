class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :url, null: false
      t.references :imageable, polymorphic: true

      t.timestamps
    end
    add_index :images, :url
  end
end
