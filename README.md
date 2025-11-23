# MBS
Movie Booking System for Software Engineering CS3365H01

**Download Requirements:**
1. Git
2. Node.js (LTS Version, Make sure it is added to PATH)

**How to allow scripts to be run for Node.js**
1. open PowerShell as Administrator
2. Check current execution policy (Get-ExecutionPolicy)
3. Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
4. Y to confirm
5. this allows for locally created scripts to run but still blocks unsigned scripts from the internet
To update npm
1. npm install -g npm@latest

**How to start dev server**
1. open command prompt
2. enter "npm install react-router-dom"
3. enter "npm start"

# Movie Booking System (MBS) — Frontend

This is the React + TypeScript + Tailwind frontend for the Movie Booking System (MBS).
It allows users to browse currently playing and upcoming movies, purchase tickets,
and view QR/barcode electronic tickets. Admins can manage shows and view ticket reports.

## Tech Stack
- React (Vite)
- TypeScript
- Tailwind CSS
- React Router
- API Layer (REST)
- Cloud/Docker friendly