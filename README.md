# Events Website

## How to run

In order to run the application correctly, you must first create a `.env` file in the `./backend` directory. It should be created like `./backend/.env.example`, so it should look like this

```
SPRING_SECRET_KEY=key
GMAIL_EMAIL=mail
GMAIL_PASSWORD=pass
```

Then run docker in the root directory of the project

```sh
docker-compose up --build
```

## Sending emails in password restart

In order to access the functionality of sending a link to restart the password via email, you need to put in `.env` your email address and [google app password](https://support.google.com/accounts/answer/185833?hl=en).

If you do not provide this information or have a problem sending the message, the link will be displayed on the console.

## Initial data

Initially, two users will be created in the application: admin and manager.

```json
{
  "admin": {
    "email": "admin@example.com",
    "password": "adminpassword"
  },
  "manager": {
    "email": "manager@example.com",
    "password": "managerpassword"
  }
}
```

Also, 40 random users and 100 random event objects will be added.

You can prevent this by deleting the files in the `./backend/src/main/java/com/backend/init`
