Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :update] do
      resources :boards, except: [:new, :edit]
    end
    resources :pins,   except: [:edit, :new]
    resources :images, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy]
    get 'search/:category', to: 'pins#search'
    get 'users/:id/followers', to: 'users#followers'
    get 'users/:id/following', to: 'users#following'
    get 'users/:id/pins', to: 'pins#userPins'
    get ':user_id/:board_id/followers', to: 'users#boardFollowers'
  end
end
