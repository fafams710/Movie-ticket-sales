# Ticket Website

This project is a full-stack web application with a Django backend and a React frontend.

## Project Setup

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

Clone the repository to your local machine using the following command:

```bash
git clone -b master --single-branch https://github.com/Edgar-Sumabat-Jr/ticket-website.git

cd ticket-website
python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

cd backend
python manage.py runserver

open another terminal
cd frontend
npm install

npm start

