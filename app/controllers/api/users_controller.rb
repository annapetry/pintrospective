module Api
  class UsersController < ApiController
   def show
     @user = User.find(params[:id])
     render json: @user
   end

   def update
   end

  end
end