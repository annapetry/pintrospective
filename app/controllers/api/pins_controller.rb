module Api
  class PinsController < ApiController

    before_action :require_user
    wrap_parameters :pin, include: [:board_id, :image_attributes, :description]

    def index
      @pins = []

      @pins << current_user.pins_of_boards_they_follow
      @pins << current_user.pins_of_users_they_follow

      render :index
    end

    def create
      @pin = current_board.pins.new(pin_params)

      if @pin.save
        render partial: 'api/pins/pin', locals: { pin: @pin }
      else
        render json: @pin.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @pin = Pin.find(params[:id])
      @pin.destroy
      render json: {}
    end

    def update
      @pin = current_board.pins.find(params[:id])

      if @pin.update_attributes(pin_params)
        render json: @pin
      else
        render json: @pin.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def current_board
      if params[:id]
        @pin = Pin.find(params[:id])
        @board = @pin.board
      elsif params[:pin]
        @board = Board.find(params[:pin][:board_id])
      end
    end

    def pin_params
      params.require(:pin).permit(:description, :board_id, :image_attributes => [:url, :imageable_id, :imageable_type])
    end

  end
end