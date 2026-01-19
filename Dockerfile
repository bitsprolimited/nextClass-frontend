# Use official nginx image
FROM nginx:alpine

# Update base image packages
RUN apk update && apk upgrade

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Create the HTML file
RUN echo '<!DOCTYPE html>\
<html lang="en">\
<head>\
  <meta charset="UTF-8">\
  <title>Coming Soon</title>\
  <style>\
    body { \
      display: flex; \
      justify-content: center; \
      align-items: center; \
      height: 100vh; \
      font-family: Arial, sans-serif; \
      background-color: #f5f5f5; \
    } \
    h1 { color: #333; } \
  </style>\
</head>\
<body>\
  <h1>NEXT CLASS COMING SOON</h1>\
</body>\
</html>' > index.html


RUN cp /app/index.html /usr/share/nginx/html/index.html

RUN chown -R appuser:appgroup /app /usr/share/nginx/html

USER appuser

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
