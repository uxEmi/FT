@echo off
title Algoritmul AI - Server Local
echo Pornim serverul local pentru interfata Algoritmul AI...
echo =======================================================
echo.

:: Verifica daca Python este instalat
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] S-a detectat Python. Pornim serverul la adresa http://localhost:8000 ...
    echo Apasa Ctrl+C in aceasta fereastra pentru a opri serverul.
    echo.
    start http://localhost:8000
    python -m http.server 8000
    goto end
)

:: Incearca cu launcher-ul py
where py >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] S-a detectat py. Pornim serverul la adresa http://localhost:8000 ...
    echo Apasa Ctrl+C in aceasta fereastra pentru a opri serverul.
    echo.
    start http://localhost:8000
    py -m http.server 8000
    goto end
)

:: Daca nu are Python, deschide fisierul direct
echo [INFO] Python nu a fost gasit in sistem.
echo Deschidem direct index.html in browserul tau implicit...
echo.
start index.html

:end
pause
