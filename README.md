# Codion Loadscreen V2 – Install & Replace Guide

## Requirements
- A running FiveM server (fxserver).
- Access to your server’s `resources/` folder and `server.cfg`.

## Installation
- Copy the folder `Codion-loadscreen V2` into your FiveM `resources/` directory.
- Recommended: rename the folder to `codion-loadscreen-v2` (no spaces) to avoid resource name issues.
- In `server.cfg`, ensure the resource (use your final folder name):

```cfg
ensure codion-loadscreen-v2
```

- Restart your server (or run `refresh` then `start codion-loadscreen-v2` in the server console).

## Replacing an Existing Loading Screen
- In `server.cfg`, remove or comment out any other loadscreen resources, for example:

```cfg
# ensure old-loadscreen
ensure codion-loadscreen-v2
```

- Only one loadscreen resource should be active to avoid conflicts.

## Files Overview
- `fxmanifest.lua`: Resource manifest. Points to `index.html` as the loadscreen and includes required assets. Registers optional dynamic tip scripts.
- `index.html`: Main HTML for the loadscreen.
- `style.css`: Visual styling and responsive layout.
- `script.js`: Loading logic (progress updates, audio behavior, tips rotation, UX hardening).
- `assets/`: Background (`bg.gif`), logo (`logo.png`), and music (`music.mp3`).
- `server.lua` and `client.lua`: Optional dynamic tip broadcaster (server) and NUI forwarder (client).

## Configuration
- Background: replace `assets/bg.gif` with your image or video (GIF/MP4); update the CSS `background` if you change the name/format.
- Logo: replace `assets/logo.png` with your logo file (keep size reasonable).
- Music: replace `assets/music.mp3`. Audio starts muted (Chromium policy); users can unmute via the button. Ensure file type matches the `<source>` tag.

### Tips (Two Options)
1) Pure JavaScript tips (default rotation in `script.js`)
   - Edit the `tips` array in `script.js` to customize.
   - To disable server-driven tips, comment out these lines in `fxmanifest.lua`:
     ```lua
     -- client_script 'client.lua'
     -- server_script 'server.lua'
     ```

2) Server-side dynamic tips
   - Keep `client.lua` and `server.lua` active in `fxmanifest.lua`.
   - Edit the `tips` table in `server.lua` to customize broadcasted tips.
   - The loadscreen receives tips via NUI (`eventName = 'tipUpdate'`) and displays them safely.

### Progress Bar Behavior
- FiveM `loadProgress` events drive the bar in real time.
- A fallback simulation gently advances to ~90% if no events arrive, so the bar never stays stuck at 0%.

## Troubleshooting
- Resource not found: ensure the folder name you used in `server.cfg` matches exactly (avoid spaces).
- No audio: audio starts muted; click/keypress/mouse movement unblocks autoplay. Confirm `assets/music.mp3` exists and is accessible.
- Tips not updating:
  - For JS tips: ensure `script.js` is loaded and no console errors.
  - For server tips: confirm `client.lua`/`server.lua` are active in `fxmanifest.lua` and watch server console for events.
- Visual overlaps: sizes are responsive via `clamp()`; if you use very small resolutions, adjust font clamps in `style.css`.

## Notes
- Pure HTML/CSS/vanilla JS; no frameworks.
- FiveM-compatible manifest metadata with Codion branding (`author`, `version`, `description`).
- Keep only one active loadscreen resource to avoid conflicts.

## Support
- For support, make a ticket in our Discord server: https://discord.gg/GbeffsbrWM
