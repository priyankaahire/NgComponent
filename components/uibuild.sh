#!/bin/sh
#> file redirects stdout to file
#1> file redirects stdout to file
#2> file redirects stderr to file
#&> file redirects stdout and stderr to file

(rm -rf build & ngd -p ./tsconfig.json -d ./dependency & npm run clean & npm run build  & gedit uibuild.txt & npm start) > uibuild.txt 2>&1

