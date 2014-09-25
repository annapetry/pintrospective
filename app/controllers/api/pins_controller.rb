module Api
  class PinsController < ApiController

    before_action :require_user

    def create
      @pin = current_board.pins.new(pin_params)

      if @pin.save
        render json: @pin
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
      params.require(:pin).permit(:description, :board_id, :url)
    end

  end
end