

# Django Polls Project


## Overview

This Django project aims to create and manage polls for hiring purposes. Users can participate in polls, view results, and receive email notifications upon completing a vote. The project is designed with modularity and scalability in mind, utilizing Django and additional technologies for enhanced functionality.

-------


# Setup

## Installation

1. Clone the repository:
   ```sh
   git clone  https://github.com/Mhdjaseer/healspan


## Create a virtual environment (recommended):
2. 
    ``` 
    python -m venv venv
    source venv/bin/activate  # On Windows, use: venv\Scripts\activate

    ```


## Install project dependencies:

3. ``` 
    pip install -r requirements.txt

    ```

## Apply database migrations:
4.  
    ```
    python manage.py makemigrations
    python manage.py migrate

    ```
# Asynchronous Email Task with Celery
 * Utilizes Celery for asynchronous tasks.
 * Emails are sent as delayed tasks, ensuring application responsiveness.


 # Setup

## Installation

1. Install and configure Celery:
   ```sh
   pip install celery


2. Run Celery:
    ```
    celery -A polls_project worker -l info

    ```
# After running the Celery you need to open another shell and activate the env 

3. Run django project:
    ```
    python manage.py runserver 

    ```



    celery -A core worker --loglevel=info

this is for running celery for the submision running on background 

--------
<<<<<<< HEAD


# Django Polls Project


## Overview

This Django project aims to create and manage polls for hiring purposes. Users can participate in polls, view results, and receive email notifications upon completing a vote. The project is designed with modularity and scalability in mind, utilizing Django and additional technologies for enhanced functionality.

-------


# Setup

## Installation

1. Clone the repository:
   ```sh
   git clone  https://github.com/Mhdjaseer/healspan


## Create a virtual environment (recommended):
2. 
    ``` 
    python -m venv venv
    source venv/bin/activate  # On Windows, use: venv\Scripts\activate

    ```


## Install project dependencies:

3. ``` 
    pip install -r requirements.txt

    ```

## Apply database migrations:
4.  
    ```
    python manage.py makemigrations
    python manage.py migrate

    ```
# Asynchronous Email Task with Celery
 * Utilizes Celery for asynchronous tasks.
 * Emails are sent as delayed tasks, ensuring application responsiveness.


 # Setup

## Installation

1. Install and configure Celery:
   ```sh
   pip install celery


2. Run Celery:
    ```
    celery -A polls_project worker -l info

    ```
# After running the Celery you need to open another shell and activate the env 

3. Run Celery:
    ```
    python manage.py runserver 

    ```
=======
>>>>>>> 21a0a7dc40cfdda6ccf9c85ce368129c9c79b02b
