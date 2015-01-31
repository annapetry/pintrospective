FactoryGirl.define do
  factory :user do
    sequence :username do |n|
      "Artist #{n}"
    end
    password 'password'
  end
end
 
