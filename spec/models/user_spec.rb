require 'rails_helper'

describe "User" do
  let(:user) { FactoryBot.create(:user) }

  describe ".find_by_credentials" do
    context "with appropriate creds" do
      it "returns a User" do
        expect(User.find_by_credentials(user.username, 'password')).to eq user
      end
    end

    context "with invalid creds" do
      it "returns nil" do
        expect(User.find_by_credentials(user.username, 'bad_password')).to be nil
      end
    end
  end

  describe "#password=" do
    it "creates an encrypted password digest" do
      old_digest = user.password_digest
      user.password=('new_password')
      expect(old_digest).not_to eq user.password_digest
    end
  end

  describe "#is_password?" do
    context "given a user's actual password" do
      it "returns true" do
        expect(user.is_password?('password')).to be true
      end
    end
    context "given an incorrect user's password" do
      it "returns false" do
        expect(user.is_password?('bad_password')).to be false
      end
    end
  end

  describe "#reset_session_token!" do
    it "sets a new session token" do
      old_token = user.session_token
      user.reset_session_token!
      expect(old_token).not_to eq user.session_token
    end
  end

  describe "#ensure_session_token" do
    describe "with an existing token" do
      it "returns a user's current session_token" do
        expect(user.ensure_session_token).to eq user.session_token
      end
    end
    describe "without an existing token" do
      before { user.session_token = nil }
      it "returns a new session_token" do
        expect(user.session_token).to be nil
        expect(user.ensure_session_token).not_to be nil
      end
    end
  end

  describe "#current_follow" do
    it "returns a follow id"
  end
end
