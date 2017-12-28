@echo off
 > uibuild.txt (@RD /S /Q build & ngd -p ./tsconfig.json -d ./dependency & npm run clean & npm run build & notepad uibuild.txt & npm start)
