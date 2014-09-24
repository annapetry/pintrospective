Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :update]
    resources :boards, except: [:new, :edit]
    resources :pins, only: [:create, :update, :destroy]
    resources :images, only: [:create, :show, :destroy]
  end
end
