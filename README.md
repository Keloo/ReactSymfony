## Installation

- complete .env.dist with your data
- assets/js/Components/FacebookLoginButton and GoogleLoginButton (complete with app ids)
- yarn install
- composer install
- yarn run encore 
- bin/console server:start
- visit localhost:8000
- jwt password: root

## What's inside
A demo app for apartment rentals
- Login (regular, fb, google)
- Registration
- 3 roles (ROLE_USER, ROLE_REALTOR, ROLE_SUPER_ADMIN)
- ROLE_USER can view apartments on list and map
- ROLE_REALTOR can CRUD his apartments
- ROLE_SUPER_ADMIN can CRUD users/apartments

## Tech used
- Backend: Symfony4 + REST API
- Frontend: React + Redux + Material UI

#### Purpose of the project is learning