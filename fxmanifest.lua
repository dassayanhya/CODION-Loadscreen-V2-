-- FiveM Resource Manifest for Loadscreen
fx_version 'cerulean'
game 'gta5'

author 'Codion'
description 'Codion Loadscreen V2'
version '2.0.0'

-- Use index.html as the loadscreen entry
loadscreen 'index.html'

loadscreen_manual_shutdown 'yes'

-- Include required files
files {
  'index.html',
  'style.css',
  'script.js',
  'assets/bg.gif',
  'assets/logo.png',
  'assets/music.mp3'
}


client_script 'client.lua'
server_script 'server.lua'
