


Step 1:  copy  docker-compose.dev.yaml,  docker-compose.production.yaml Makefile.dev and Makefile  inside frontend/dockerfile   outside  the frontend folder

Setp 2:  rename  Backend_ArtistManagementtSystem folder to backend

Step 3: rename Frontend_ArtistManagementSystem  folder to frontend

Step 4:  change .env.sample to .env  and add Data accordingly of both backend and frontend

Step 5:  run in terminal -> make prod-db

Step 6: run -> docker ps

Step 7:  run in terminal -> make prod-build

Step 8:  run in terminal -> make prod-up





"In case of new package installed in backend..  RUN 'poetry export --format requirements.txt --output requirements.txt'" 

"For seeding  dumpdata:  python manage.py  dumpdata  user.Users >  seed/users.json"

"For seeding  loaddata:  python manage.py  loaddata  user.Users >  seed/users.json"


