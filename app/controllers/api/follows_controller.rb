module Api
  class FollowsController < ApplicationController
    before_action :require_user

    def create
      @follow = current_user.follows.new(follow_params)

      if @follow.save
        render json: @follow
      else
        render json: @follow.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @follow = current_user.follows.find(params[:id])
      @follow.destroy!
      render json: {}
    end

    private

    def follow_params
      params.require(:follow).permit(:id, :user_id, :followable_type, :followable_id)
    end

  end
end