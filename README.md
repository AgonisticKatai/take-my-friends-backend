**Iniciar servidor**:

```
npm install
npm run dev
```

**Obtener TOKEN de acceso** (postman)

```
POST http://localhost:3005/login
username: admin@admin.com
password: 1234
```

**Obtener TOKEN de acceso** (curl)

```
curl -X POST \
  http://localhost:3005/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'username=admin%40admin&password=1234'
```

**Crear usuario** (postman)

```
POST http://localhost:3005/resgister
Headers
    Key: Authorization
    Value: 'bearer ' + _TOKEN_
Body
    _marcar método de envio x-www-form-urlencoded_
    Key: email
    Value: _example@email_
    Key: password
    Value: _your password_
```

**Crear usuario** (curl)

```
curl -X POST \
  http://localhost:3005/register \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'email=user1%40prueba&password=1234'
```

**Hacer peticiones a rutas privadas** (postman)

```
ejemplo de petición GET:
    GET http://localhost:3005/users
    Body
        Key: Authorization
        Value: 'bearer ' + _Token_
```

**Hacer peticiones a rutas privadas** (curl)

```
ejemplo de petición GET:
    curl -X GET \
      http://localhost:3005/users \
      -H 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMGRjMzA4OGM3NTYyMmEyZTBhNjA0MSIsImlhdCI6MTUxMTg4MDcyOH0.H1rzpDApVvtIFEVMEhkYmu61hTabqleu3lwSo1F_-28' \
      -H 'cache-control: no-cache' \
```

**Endpoints**:

```
post('/register')
post('/login')

get('/user')
get('/user/:id')
put('/user/:_id')
get('/users')
put('/account')
get('/friends')
get('/friends/:job')
put('/message/:id')
get('/messages_inbox')
get('/messages_outbox')
delete('/message_inbox/:id')
delete('/message_outbox/:id')
get('/friends_jobs')
get('/suggestions')
get('/auth/linkedin')
```


