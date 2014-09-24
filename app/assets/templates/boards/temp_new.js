<div class="modal fade" id="addBoardModal" tabindex="-1" role="dialog" aria-labelledby="addBoard" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="addBoard">Create a Board</h4>
      </div>
      <div class="modal-body">
        <form role="form" id="new-board-form" class="form-horizontal">
          <div class="form-group">
            <label for="board-title" class="col-sm-2 control-label">Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="board-title"
                name="board[title]"
                placeholder='Like "Design Inspiration" or "Favorite Portraits"'>
            </div>
          </div>
          <div class="form-group">
            <label
              for="board-desc"
              class="col-sm-2 control-label">
              Description
            </label>
            <div class="col-sm-10">
              <textarea
                class="form-control"
                id="board-desc"
                name="board[description]"
                placeholder="What's your board about?"></textarea>
            </div>
          </div>



          <div class="dropdown">
            <button
              class="btn btn-default dropdown-toggle"
              type="button"
              id="cat-dropdown"
              data-toggle="dropdown">
              What kind of board is it?
              <span class="caret"></span>
            </button>
            <ul
              class="dropdown-menu"
              role="menu"
              aria-labelledby="dat-dropdown">
                <li role="presentation">
                  <a role="menuitem" tabindex="-1" href="#">Avant-Garde</a>
                </li>
                <li role="presentation">
                  <a role="menuitem" tabindex="-1" href="#">Conceptual</a>
                </li>
                <li role="presentation">
                  <a role="menuitem" tabindex="-1" href="#">Dada</a>
                </li>
                <li role="presentation">
                  <a role="menuitem" tabindex="-1" href="#">Impressionism</a>
                </li>
                <li role="presentation">
                  <a role="menuitem" tabindex="-1" href="#">Surrealism</a>
                </li>
            </ul>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Create Board</button>
      </div>
    </div>
  </div>
</div>