require 'rails_helper'

feature "User Account Creation" do
  scenario "User can create an account" do
    # visit new_user_path
    binding.pry
    visit '/'
    # expect(page).to have_content "Add a Photo"
  end
end
