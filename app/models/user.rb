class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :username, uniqueness: true

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :boards, dependent: :destroy
  has_one :image, as: :imageable, dependent: :destroy

  has_many(
    :pins,
    through: :boards,
    source: :pins
  )

  # FOLLOWERS => Users that follow THIS User
  has_many :followers, class_name: "Follow", foreign_key: "followable_id"
  # FOLLOWEES => Users or Boards that THIS user follows
  has_many :followees, class_name: "Follow", foreign_key: "user_id"

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  private
  def generate_session_token
    SecureRandom::urlsafe_base64
  end
end
