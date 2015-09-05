class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :username, uniqueness: true
  # validates_uniqueness_of :user_id, scope: [:followable_id, :followable_type]

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :boards, dependent: :destroy
  has_one :image, as: :imageable, dependent: :destroy
  accepts_nested_attributes_for :image

  has_many(
    :pins,
    through: :boards,
    source: :pins
  )

  has_many(
    :follows_from_user,
    class_name: "Follow",
    foreign_key: "followable_id"
  )

  has_many(
    :follows,
    class_name: "Follow",
    foreign_key: "user_id"
  )

  has_many(
    :followers,
    through: :follows_from_user,
    source: :user
  )

  has_many(
    :users_they_follow,
    through: :follows,
    source: :followable,
    source_type: 'User'
  )

  has_many(
    :boards_they_follow,
    through: :follows,
    source: :followable,
    source_type: 'Board'
  )

  has_many(
    :boards_they_follow_through_users,
    through: :users_they_follow,
    source: :boards
  )

  has_many(
    :pins_of_boards_they_follow,
    through: :boards_they_follow,
    source: :pins
  )

  has_many(
    :pins_of_users_they_follow,
    through: :users_they_follow,
    source: :pins
  )

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def current_follow(user_id)
    follow = self.follows_from_user.find_by(user_id: user_id)

    if follow
      return follow.id
    else
      return nil
    end
  end

  private

  def generate_session_token
    SecureRandom::urlsafe_base64
  end
end
