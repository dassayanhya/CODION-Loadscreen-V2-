-- Codion Loadscreen V2 - Server-side dynamic tips broadcaster
-- Author: Codion

local tips = {
  "Tip: Use /me for roleplay actions.",
  "Tip: Obey traffic laws to avoid fines.",
  "Tip: Keep valuables safe to prevent theft.",
  "Tip: Insurance helps recover stolen vehicles.",
  "Tip: Join Discord for support and updates.",
  "Tip: Report bugs to staff politely.",
  "Tip: Respect other players; serious roleplay only.",
  "Tip: Read server rules before playing.",
}

CreateThread(function()
  while true do
    local tip = tips[math.random(#tips)]
    TriggerClientEvent('codion:loadscreenTip', -1, tip)
    Wait(15000)
  end
end)

