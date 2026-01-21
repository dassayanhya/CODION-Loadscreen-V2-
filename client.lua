-- Codion Loadscreen V2 - Client
-- Forwards server tips to loadscreen NUI

RegisterNetEvent('codion:loadscreenTip', function(tip)
  local payload = {
    eventName = 'tipUpdate',
    tip = tip
  }
  SendNuiMessage(json.encode(payload))
end)

