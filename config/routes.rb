Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :update] do
      resources :boards, only: [:index]
    end
    resources :boards, except: [:new, :edit, :index]
    resources :pins, only: [:create, :update, :destroy]
    resources :images, only: [:create, :show, :destroy]
  end
end
