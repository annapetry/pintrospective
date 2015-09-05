class UsersController < ApplicationController
   wrap_parameters :user, include: [:username, :location, :description, :image_attributes]

  def new; end

  def create
    @user = User.new(user_params)

    @user.update_attributes({
      image_attributes: {
        url: params[:image][:url],
        imageable_type: "User"
      }
    })

    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :description, :location, image_attributes: [:url, :imageable_id, :imageable_type])
  end
end
