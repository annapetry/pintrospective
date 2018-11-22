require 'rails_helper'

describe ApplicationController do
  let(:user) { FactoryBot.create :user }

  before { subject.login!(user) }

  describe "#current_user" do
    it "returns the current user" do
      expect(subject.current_user).to eq user
    end
  end

  describe "#login!" do
    it "sets current_user to given user" do
      expect(subject.current_user).to eq user
    end
    it "sets the session_token to user.session_token" do
      expect(session[:session_token]).to eq user.session_token
    end
  end

  describe "#require_user" do
    context "current_user is not set" do
      before { current_user = nil }
      it "redirects to new_session_url"
    end
    context "current_user is set" do
      it "returns nil" 
    end
  end
end
