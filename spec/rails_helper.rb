require 'simplecov'
SimpleCov.start 'rails'

# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] = 'development'
require 'spec_helper'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'capybara/rails'
require 'factory_girl_rails'

FactoryGirl.reload

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = false

  config.infer_spec_type_from_file_location!

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
end
