# WEBTECH’S FakeRestaurant
FakeRestaurant is a satirical platform that allows users to invent imaginary restaurants and write humorous reviews, creating a playful parody of traditional food review sites.

## Installing dependencies
Assuming you are in the /FakeRestaurant directory
#### Backend
```
cd backend
npm install
```

#### Frontend
```
cd frontend
npm install
```

#### Tests
```
cd e2eAutomatedTests
npm install
```

## Create environment files
#### Backend
Create a new .env file:
```
cd backend
touch .env
```
Enter data (<strong>please do not change any environment variable names!</strong>): <br>
in <em>/FakeRestaurant/backend/.env</em>
```
DB_CONNECTION_URI = "sqlite:fakerestaurant.db"
DB_CONNECTION_USERNAME = "fakerestaurant"
DB_CONNECTION_PASSWORD = "fakerestaurant"
DIALECT = "sqlite"
SECRET_TOKEN = "secretkey"
```
### Frontend
Create a new environment.development.ts file:
```
cd frontend/src/environments
touch environment.development.ts
```
Enter data (<strong>please do not change any object property names!</strong>): <br>
in <em>FakeRestaurant/frontend/src/environments/environment.development.ts:</em>
```
export const environment = {
    production: false,
    backendUrl: 'http://localhost:3000',
    geoapifyApiKey: "yourGeoapifyAPIKey",
};
```

## Running
Assuming you are in the /FakeRestaurant directory
#### Backend
```
cd backend
npm start
```

#### Frontend
```
cd frontend
ng serve
```

#### Tests
<strong>Tests order is meaningful, so please run them sequentially</strong>
```
cd e2eAutomatedTests

# parallelism disabled, executed in alphabetical order
npx playwright test --workers=1
```
