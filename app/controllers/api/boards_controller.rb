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
      user = User.find(params[:user_id])
      boards = user.boards

      @board = boards.includes(:pins).find(params[:id])
      if @board
        render :show
      else
        render json: "Pinner does not have that Board", status: :not_found
      end
    end

    def update
      @board = current_user.boards.find(params[:id])

      if @board.update_attributes(board_params)
        render json: @board
      else
        render json: @board.errors.full_messages, status: :unprocessable_entity
      end
    end

    def search
      @boards = Board.where('category = ?', params[:category])

      render :categoryShow
    end

    private

    def board_params
      params.require(:board).permit(:title, :description, :category)
    end
  end
end
