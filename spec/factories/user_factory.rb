FactoryGirl.define do
  sequence :username do |n|
    "Artist #{n}"
  end

  factory :user do |variable|
    username
    password 'password'
    image { Image.create(url: 'www.annapetry.com/assets/petry.jpg') }
  end
end
