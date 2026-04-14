FROM postgres:15-alpine

# Install postgis extension for geospatial data
RUN apk add --no-cache postgis

# Copy initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/
COPY migrations/ /docker-entrypoint-initdb.d/migrations/

# Set custom configuration
COPY postgresql.conf /etc/postgresql/postgresql.conf

# Expose port
EXPOSE 5432

# Run postgres with custom config
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]