
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

    def userPins
      user = User.find(params[:id])
      @pins = user.pins
      render :index
    end

    def search
      boards = Board.where('category = ?', params[:category])
      @pins = [];

      boards.each do |board|
        @pins += board.pins
      end

      render :index
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
