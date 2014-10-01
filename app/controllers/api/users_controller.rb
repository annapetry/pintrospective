module Api
  class UsersController < ApiController

    wrap_parameters :user, include: [:username, :location, :description, :image_attributes]

   def show
     @user = User.includes(:users_they_follow, [:pins => :image, :boards => :pins]).find(params[:id])
     render :show
   end

   def update
     @user = current_user
     @user.update_attributes(user_params)

     if @user.save
       render :show
     else
       render json: @board.errors.full_messages, status: :unprocessable_entity
     end
   end

   def followers
     user = User.find(params[:id])
     @users = user.followers
     render :index
   end

   def following
     user = User.find(params[:id])
     @users = user.users_they_follow
     render :index
   end

   def boardFollowers
     board = Board.find(params[:board_id])
     @users = board.followers
     render :index
   end

   private

   def user_params
     params.require(:user).permit(:username, :description, :location, :image_attributes => [:url, :imageable_id, :imageable_type])
   end

  end
end