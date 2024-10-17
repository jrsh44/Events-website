# Użyj oficjalnego obrazu Mavena z JDK
FROM maven:3.8.5-openjdk-17-slim AS builder

WORKDIR /app

COPY pom.xml ./
COPY src ./src
COPY ./.env .env

RUN mvn clean install -DskipTests

FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar ./backend.jar

EXPOSE 8080

CMD ["java", "-jar", "backend.jar"]
