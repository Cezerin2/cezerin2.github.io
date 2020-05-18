# Deploy on Multi instance

- [Create Mongo Atlas](#a-create-mongo-atlas)
- [Create Cezerin Api](#b-create-cezerin-api)
  - [Create AWS EC2 Instance](#create-aws-ec2-instance)
  - [Install Docker](#install-docker)
  - [Run Cezerin Api](#run-cezerin-api)
  - [Prepare Database](#prepare-database)
  - [Setup api with CloudFlare](#setup-api-with-cloudflare)
- [Create Cezerin Admin](#b-create-cezerin-admin)
  - [Create AWS S3](#create-aws-s3)
  - [Build Cezerin2 admin](#build-cezerin2-admin)
  - [Copy Cezerin2 admin to S3](#copy-cezerin2-admin-to-s3)
  - [Setup admin with CloudFlare](#setup-admin-with-cloudflare)
- [Create Cezerin Store Front](#b-create-cezerin-store-front)
- [Turn off developer mode](#d-turn-off-developer-mode)

## A) Create Mongo Atlas

I'll use [Mongo Atlas](https://www.mongodb.com/cloud/atlas) to host the database.

1. Click **Build a New Cluster**
2. Add **MongodbUser**
3. Create **Database**

## B) Create Cezerin Api

### 1. Create AWS EC2 Instance

I'll use [AWS](https://aws.amazon.com/console/) to host Cezerin API.

1. Click **Services** - **EC2**
2. Click **Launch Instance**
   - Choose an image: `Ubuntu Server 18.04 LTS`
   - Choose a type: `t2.micro`
3. Get aws **IPv4 Public IP** and add to **Cloud atlas Whitelist**
4. Click **Connect** and Then SSH to instance.

### 2. Install Docker

[Docker guide.](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

```shell
sudo apt-get update
```

```shell
sudo apt-get install \
apt-transport-https \
ca-certificates \
curl \
software-properties-common
```

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

```shell
sudo add-apt-repository \
"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) \
stable"
```

```shell
sudo apt-get update
```

```shell
sudo apt-get install docker-ce
```

### 3. Run Cezerin Api

1. Get mongo atlas url

   - At **Mongo Atlas** click **connect**
   - Click **Connect to Application**
     - Choose an driver: `Node.js`
     - Choose an version: `3.0 or later`
   - Copy connection string

2. run docker cezerin2 image

```shell
docker run -d \
--name api \
-p 80:80 \
-e DB_URL=<ATLAS_URL> \
-e API_BASE_URL=http://api.example.com/api/v1 \
-e STORE_URL=http://www.example.com \
-e ADMIN_BASE_URL=http://admin.example.com \
-e ASSETS_BASE_URL=http://api.example.com \
-v ~/cezerin2-content:/var/www/cezerin2/public/content \
cezerin2/cezerin2:latest
```

Check logs

```shell
docker logs api
```

### 4. Prepare Database

Run `npm run setup` on api container to add default data and create indexes.

```shell
sudo docker exec api bash -c "npm run setup admin@example.com http://www.example.com"
```

### 5. Setup api with CloudFlare

I'll use [Cloudflare.](https://www.cloudflare.com) for DNS host

- Get aws **IPv4 Public IP**
- Add `A` and `CNAME` to DNS on CloudFlare
  - choose type: `api`
  - choose value: `EC2 IPv4 Public IP`
- Set SSL to `Flexible` on CloudFlare
- Turn on `Always use HTTPS` on CloudFlare

## B) Create Cezerin Admin

### 1. Create AWS S3

### 2. Build Cezerin2 admin

### 3. Copy Cezerin2 admin to S3

### 5. Setup admin with CloudFlare

I'll use [Cloudflare.](https://www.cloudflare.com) for DNS host

- Get aws S3 **Endpoint**
- Add `CNAME` to DNS on CloudFlare
  - choose type: `admin`
  - choose value: `Endpoint`
- Set SSL to `Flexible` on CloudFlare
- Turn on `Always use HTTPS` on CloudFlare

## C) Create Cezerin store front

## D) Turn off developer mode
