-- Codion Loadscreen V2 - Client Controlled Shutdown

CreateThread(function()
    -- Wait until player is fully active
    while not NetworkIsPlayerActive(PlayerId()) do
        Wait(100)
    end

    -- Small safety buffer for frameworks & exports
    Wait(800)

    -- Force UI to 100% before exit
    SendNuiMessage(json.encode({
        eventName = "loadProgress",
        loadFraction = 1.0
    }))

    -- Trigger fade-out
    SendNuiMessage(json.encode({
        eventName = "fadeOut"
    }))

    -- Allow fade animation to finish
    Wait(900)

    -- Clean shutdown (NO default FiveM UI)
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end)
