### Using Docker

* [Docker](#docker)
* [Docker Compose](#docker-compose)

### Docker

 - **Run MongoDB**
 ```shell
 docker run -d \
 --name store-db \
 -v /db-on-host:/data/db \
 mongo:latest
 ```

 - **Run Cezerin2** [About image](https://github.com/Cezerin2/docker-cezerin2/blob/master/cezerin2/README.md).
 ```shell
 docker run -d \
 --name cezerin2 \
 --link store-db:db \
 -p 3001:80 \
 -e DB_HOST=db \
 -e DB_PORT=27017 \
 -e DB_NAME=shop \
 -e DB_USER=user \
 -e DB_PASS=password \
 -v /content-on-host:/var/www/cezerin2/public/content \
 cezerin2/cezerin2:latest
 ```

 - **Run Cezerin2 Admin** [About image](https://github.com/Cezerin2/docker-cezerin2/blob/master/cezerin2-admin/README.md).
 ```shell
 docker run -d \
 --name cezerin2-admin \
 --link cezerin2:cezerin2 \
 -p 3002:80 \
 cezerin2/cezerin2-admin:latest
 ```

 - **Run Cezerin2 Store** [About image](https://github.com/Cezerin2/docker-cezerin2/blob/master/cezerin2-store/README.md).
 ```shell
 docker run -d \
 --name ceszerin2-store \
 --link cezerin2:cezerin2 \
 -p 3000:80 \
 -e API_BASE_URL=http://cezerin2/api/v1 \
 -e AJAX_BASE_URL=http://cezerin2/ajax \
 cezerin2/cezerin2-store:latest
 ```

 - **Open Cezerin2**

 Application|Repo|URL
-|-|-
`Store`|cezerin2-store|[http://localhost:3000](http://localhost:3000)
`api`|cezerin2|[http://localhost:3001](http://localhost:3001)
`admin`|cezerin2-admin|[http://localhost:3002](http://localhost:3002)

### Docker Compose

 - **docker-compose.yml** [About image](https://github.com/Cezerin2/docker-cezerin2/blob/master/README.md).
```shell
version: '3'

services:
  cezerin2:
    image: cezerin2/cezerin2
    ports:
      - 3001:80
    environment:
      - DB_HOST=db
      - DB_PORT=27017
      - DB_NAME=shop
      - DB_USER=user
      - DB_PASS=password
    volumes:
      - ./content-on-host:/var/www/cezerin2/public/content
    depends_on:
      - db
    restart: always

  cezerin2-store:
    image: cezerin2/cezerin2-store
    environment:
      - API_BASE_URL=http://cezerin2/api/v1
      - AJAX_BASE_URL=http://cezerin2/ajax
    ports:
      - 3000:80
    depends_on:
      - cezerin2
    restart: always

  admin:
    image: cezerin2/cezerin2-admin
    ports:
      - 3002:80
    depends_on:
      - cezerin2
    restart: always

  db:
    image: mongo:3.4
    ports:
      - 27017:27017
    volumes:
      - ./db-on-host:/data/db
    restart: always
```

 - **Open Cezerin2**

 Application|Repo|URL
-|-|-
`Store`|cezerin2-store|[http://localhost:3000](http://localhost:3000)
`api`|cezerin2|[http://localhost:3001](http://localhost:3001)
`admin`|cezerin2-admin|[http://localhost:3002](http://localhost:3002)