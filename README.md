# Sprofiler
An open source data analysis &amp; bookkeeping suite for coffee.

Currently, the Sprofiler app is only compiled for android, with iOS support slated for a later date.
It will soon be available through the google play store, but can be sideloaded through the instructions below.

Feel free to submit bug reports and feature requests through github, or join the Hunge Labs discord at https://discord.gg/QZHkTsbd
If there are issues with the instalation instructions, make sure to report it!

To follow the development process & the roadmap, check out the trello!
 - https://trello.com/b/ME1z05LE/sprofiler

# Installation

To build the frontend for the sprofiler, install android studio & configure it acording to the Capacitor JS docs. 
 - https://capacitorjs.com/docs/getting-started/environment-setup
 
If you don't have NodeJS installed, get it from:
 - https://nodejs.org/en/download/
 
 Use NPM to get yarn by running `npm install -g yarn` in a console window
  - https://yarnpkg.com/getting-started/install
  
Pull down the repo (github desktop is recommended as a client.)
- https://desktop.github.com/

In the 'sprofilerApp' directory, call `yarn` from the comand line to download / unpack / install the packages required by sprofiler

Install the capacitor CLI toolset. This can be called by running `yarn global add @capacitor/cli`
 - https://capacitorjs.com/docs/getting-started

Install the Vue CLI
 - https://cli.vuejs.org/guide/

To run a local server for ui dev, call `yarn serve` in `sprofilerApp`.

Add the android build target. (Not sure if this is necessary..) `npx cap add android`

To build for prod, call `yarn build` inside `sprofilerApp`.

In android studio, open the 'android' folder that now exists in the `sprofilerApp` directory.

You may need to reset the splash screen to not show or fix some issues with certain libraries not loading.

 - If you run into *any* issues, __REACH OUT!__



Have fun, share & share alike :D

-- Tess <3
