module Api
  class UsersController < ApiController
   def show
     @user = User.includes(:boards).find(params[:id])
     render :show
   end

   def update
   end

  end
end