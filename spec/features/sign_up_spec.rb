require 'rails_helper'

feature "Creating an account" do

  describe "the signup process" do

    before(:each) do
      visit new_user_path
    end

    it "has a signup page" do
      expect(page).to have_content "Sign Up"
    end

    it "requires a Username" do
      fill_in 'password', with: 'password'
      fill_in 'imageUrl', with: 'http://www.annapetry.com/assets/petry.jpg'
      click_on 'Sign Up'
      expect(page).to have_content "Username can't be blank"
      expect(page).to_not have_css "div.current_user"
    end

    it "requires a Password" do
      fill_in 'username', with: 'annapetry'
      fill_in 'imageUrl', with: 'http://www.annapetry.com/assets/petry.jpg'
      click_on 'Sign Up'
      expect(page).to have_content "Password is too short"
    end

    it "requires an image" do
      fill_in 'username', with: 'annapetry'
      fill_in 'password', with: 'password'
      click_on 'Sign Up'
      expect(page).to have_content "Image url can't be blank"
    end

    it "shows Username after signup" do
      fill_in 'username', with: 'annapetry'
      fill_in 'password', with: 'password'
      fill_in 'imageUrl', with: 'http://www.annapetry.com/assets/petry.jpg'
      click_on 'Sign Up'
      expect(page).to have_content "annapetry"
    end
  end

end
