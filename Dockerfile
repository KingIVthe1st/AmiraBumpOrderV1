# Use lightweight Nginx image
FROM nginx:alpine

# Copy the static website files to Nginx's default directory
COPY . /usr/share/nginx/html/

# Copy custom nginx configuration if needed
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
