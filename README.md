# MetricMaster - Website Performance Evaluation Platform

MetricMaster is a comprehensive platform to evaluate website performance. The solution comprises multiple projects, each with its own setup and run instructions. Please follow the respective instructions for each project as described below.

## Project Overview

1. `node_fe_analyser/performance_test` - Python Virtual Environment
2. `storeBE` - C# with ASP.NET, Dockerfile included
3. `LearningPlatformBE` - C# with ASP.NET, Dockerfile included
4. `nextbe_learning` - Next.js
5. `nextbe_store` - Next.js
6. `node_fe_analyser` - Node.js
7. `main_front_end` - React.js
8. `store` - React.js
9. `fe_learning_platform` - React.js

## Project Setup and Run Instructions

### node_fe_analyser/performance_test

This project is built with Python. Use a virtual environment (venv) to manage the dependencies:

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt


### storeBE and LearningPlatformBE
These are C# projects developed with ASP.NET. A Dockerfile is included in the root directory for each. To build and run:


docker build -t Dockerfile .

for storeBE:
docker run -d -p 324:7080 Dockerfile

for LearningPlatformBE:
docker run -d -p 324:7082 Dockerfile



### nextbe_learning and nextbe_store
These projects are built with Next.js. To install the dependencies and run the development server:


npm install
npm run dev


### main_front_end, store and fe_learning_platform
These are React.js projects. To install the dependencies and start the development server:

npm install
npm start


Contribute
Feel free to submit pull requests or create issues if you find any bugs or have any suggestions to improve the platform.

License
MetricMaster is MIT licensed.







