# Dockerized Flask Application
This repository contains files to build and deploy a Dockerized Flask application and automate the deployment process using Github action, leveraging Google Container Registry (GCR).

## Files Included:
* ./github/workflows/build-and-push.yaml: Defines the github action pipeline for building, tagging, and pushing the Docker image to GCR.
* Dockerfile: Contains instructions to build a Docker image for the Flask application.
* testapp.py: Flask application script.
* README.md: Instructions for setting up the project and running the application.

## Prerequisites:

* Docker installed on your local machine.
* GCP account with GCR service access.
* GCLOUD CLI Configured

## Setup Instructions:
1. Clone the Repository:

* `git@github.com:supersilo/ct-assessment.git`

* `cd ct-assessment`

## Testing the Application Locally:
1. Build the Docker Image:
* `docker build -t test-app .`
2. Run the Docker Container:
* `docker run -d -p 80:80 test-app`

3. Access the Application:
* Open a web browser and navigate to http://localhost:80 to see the Flask application running.