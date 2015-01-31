require 'rails_helper'

describe Api::BoardsController do
  let(:user) { create :user }
  let(:board) { FactoryGirl.create(:board, user: user) }

  # before do
  #   visit '/session/new'
  #   fill_in 'usernameField', with: 'petry'
  #   fill_in 'passwordField', with: 'password'
  #   click_on 'Sign In'
  # end

  context "#index" do
    it "will allow access" do
      get :index, format: :json
      expect(response.status).to eq 200
    end
  end



end
