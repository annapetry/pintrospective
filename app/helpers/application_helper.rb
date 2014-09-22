module ApplicationHelper

  def auth_token
    token = "<input type='hidden' name='authenticity_token' value='"
    token += form_authenticity_token
    token += "'>"
    token.html_safe
  end
end
