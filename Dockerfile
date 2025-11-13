FROM nginx:alpine

# Copy the static site into nginx html root
COPY public /usr/share/nginx/html

# Also copy the data folder so /data/db.json is available
COPY data /usr/share/nginx/html/data

EXPOSE 80
