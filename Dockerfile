# Building the binary of the App
FROM golang:1.19 AS build

WORKDIR /go/src/tasky
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /go/src/tasky/tasky


FROM alpine:3.17.0 as release

#Updates for security vulnerabilities
RUN apk --no-cache update && apk --no-cache upgrade \
    && apk --no-cache add libcrypto3 libssl3

##Created non-root user for container security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup  

WORKDIR /app
COPY --from=build  /go/src/tasky/tasky .
COPY --from=build  /go/src/tasky/assets ./assets

# This will copy my text file into the container
COPY wizexercise.txt .

# Gave  non root user access to workdir to be able to run the app
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
ENTRYPOINT ["/app/tasky"]


