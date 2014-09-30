module Api
  class ImagesController < ApplicationController
    before_action :require_user

    def create
      @image = Image.new(image_params)

      if @image.save
        render json: @image
      else
        render json: @image.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @image = Image.find(params[:id])
      @image.update_attributes(image_params)

      if @image.save
        render json: @image
      else
        render json: @image.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @image = Image.find(params[:id])
      @image.destroy
      render json: {}
    end

    private

    def image_params
      params.require(:image).permit(:url, :imageable_type, :imageable_id)
    end

  end
end