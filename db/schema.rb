# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141002171251) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boards", force: :cascade do |t|
    t.integer  "user_id",                     null: false
    t.text     "description"
    t.string   "title",                       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "pins_count",      default: 0
    t.integer  "follows_count",   default: 0
    t.string   "category"
    t.integer  "followers_count"
  end

  add_index "boards", ["category"], name: "index_boards_on_category", using: :btree
  add_index "boards", ["user_id"], name: "index_boards_on_user_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "user_id",         null: false
    t.integer  "followable_id"
    t.string   "followable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "follows", ["followable_id", "followable_id"], name: "index_follows_on_followable_id_and_followable_id", using: :btree
  add_index "follows", ["followable_id", "followable_type"], name: "index_follows_on_followable_id_and_followable_type", using: :btree
  add_index "follows", ["followable_id", "user_id"], name: "index_follows_on_followable_id_and_user_id", using: :btree
  add_index "follows", ["user_id"], name: "index_follows_on_user_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "url",            null: false
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "images", ["imageable_id", "imageable_type"], name: "index_images_on_imageable_id_and_imageable_type", using: :btree
  add_index "images", ["url"], name: "index_images_on_url", using: :btree

  create_table "pins", force: :cascade do |t|
    t.string   "description"
    t.integer  "board_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pins", ["board_id"], name: "index_pins_on_board_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                    null: false
    t.string   "password_digest",             null: false
    t.string   "session_token",               null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
    t.string   "location"
    t.integer  "boards_count",    default: 0
    t.integer  "follows_count",   default: 0
    t.integer  "followers_count"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
