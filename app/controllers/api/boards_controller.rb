module Api
  class BoardsController < ApiController
    def create
      @board = current_user.boards.new(board_params)

      if @board.save
        render json: @board
      else
        render json: @board.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @board = current_user.boards.find(params[:id])
      @board.try(:destroy)
      render json: {}
    end

    def index
      user = User.find(params[:user_id])
      @boards = user.boards
      render json: @boards
    end

    def show
      @board = Board.includes(:pins).find(params[:id])
      render json: @board
    end

    def update
      @board = current_user.boards.find(params[:id])

      if @baord.update_attributes(board_params)
        render json: @board
      else
        render json: @board.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def board_params
      params.require(:board).permit(:title, :description)
    end
  end
end
