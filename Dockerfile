# Use a slim version of Python
FROM python:3.12-slim


# Update and upgrade packages, and install Flask without recommended packages
RUN apt-get update && \
    pip install --no-cache-dir Flask

# Create a non-root user 
#This helps improve security by reducing the risk of potential security vulnerabilities and limiting the impact of security breaches within the container environment
RUN adduser --disabled-password --gecos '' appuser

# Switch to the non-root user
USER appuser

# Set the working directory in the container
WORKDIR /app

# Copy the application files and change the ownership to the non root user
COPY --chown=appuser:appuser . .

# Expose the port on which the Flask app will run
EXPOSE 80

# Run the Flask application
CMD ["python", "testapp.py"]
