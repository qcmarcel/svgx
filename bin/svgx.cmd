:: Created by @qcmarcel, please don't edit manually.
:: Only use absolute path
@ECHO OFF
set basedir=%~dp0
node "%basedir%../index.js" "%cd%" %*