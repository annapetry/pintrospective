require 'rails_helper'

feature "Signing in" do

  let(:user) { FactoryGirl.create(:user, image: Image.create({ url: 'www.annapetry.com/assets/petry.jpg' }) )}

  describe "the signin process" do

    before(:each) do
      visit new_session_path
    end

    it "has a signin page" do
      expect(page).to have_content "Sign In"
    end

    it "requires a Username" do
      expect(page).to_not have_css('.alert', visible: true)
      fill_in 'passwordField', with: user.password
      click_on 'Sign In'
      expect(page).to have_content "Invalid Email and/or Password"
      expect(page).to_not have_css "div.current_user"
    end

    it "requires a Password" do
      expect(page).to_not have_css('.alert', visible: true)
      fill_in 'usernameField', with: user.username
      click_on 'Sign In'
      expect(page).to have_content "Invalid Email and/or Password"
    end

    it "shows Username after signin" do
      expect(page).to_not have_css('.alert', visible: true)
      fill_in 'usernameField', with: user.username
      fill_in 'passwordField', with: user.password
      click_on 'Sign In'
      expect(page).to have_content user.username
    end
  end

  describe "the signout process" do

    before do
      visit new_session_path
      fill_in 'usernameField', with: user.username
      fill_in 'passwordField', with: user.password
      click_on 'Sign In'
    end

    it "redirects user to sign-in page" do
      within(".right") do
        find('button#log-out').click
        click_on 'Log Out'
      end
      # TODO error of invalid auth token on sign out, redirects to /session
      # expect(page.current_path).to eq '/session/new'
      save_and_open_page
    end
  end

end
