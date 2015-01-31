FactoryGirl.define do
  factory :journal do
    sequence :title do |n|
      "Board #{n}"
    end
  end

  factory :user do
    sequence :username do |n|
      "Artist #{n}"
    end
    password 'password'
  end
end
