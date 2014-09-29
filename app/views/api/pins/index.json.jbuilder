json.partial! 'api/pins/pin', collection: @pins, as: :pin



json.pins @pins do |pin|
  json.partial! 'api/pins/pin', pin: pin
end