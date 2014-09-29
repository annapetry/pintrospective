module Api
  class UsersController < ApiController
   def show
     @user = User.includes(:boards).find(params[:id])
     render :show
   end

   def update
     @user = current_user.update_attributes(user_params);

     if @user.save
       render :show
     else
       render json: @board.errors.full_messages, status: :unprocessable_entity
     end
   end

   private

   def user_params
     params.require(:user).permit(:username, :description, :location)
   end

  end
end