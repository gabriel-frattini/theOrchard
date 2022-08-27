## Table of contents 📜

- <a href="#showcase">Showcase</a>
- <a href="#setup">Setup</a>


<div align="center">
<h2 id="showcase" >The Orchard Holiday Home &#127796;</h2>
<img src="https://github.com/gabriel-frattini/theOrchard/blob/main/src/images/showcase/theorchard.jpg" width="720" height="400" />
</div>
<div align="center">
<h2 align="center">Admin Panel &#128272;</h2>

<img src="https://github.com/gabriel-frattini/theOrchard/blob/main/src/images/showcase/admin_index.jpg" width="720" height="400" object-fit="contain"/>
<img src="https://github.com/gabriel-frattini/theOrchard/blob/main/src/images/showcase/admin_rooms.jpg" width="720" height="400" object-fit="contain"/>
<img src="https://github.com/gabriel-frattini/theOrchard/blob/main/src/images/showcase/admin_roomslug.jpg" width="720" height="400" object-fit="contain"/>

<div>
<img src="https://github.com/gabriel-frattini/theOrchard/blob/main/src/images/showcase/admin_index_mobile.jpg" width="238" height="370" object-fit="contain"/>
<img src="https://github.com/gabriel-frattini/theOrchard/blob/main/src/images/showcase/admin_rooms_mobile.jpg" width="238" height="370" object-fit="contain"/>
<img src="https://github.com/gabriel-frattini/theOrchard/blob/main/src/images/showcase/admin_roomslug_mobile.jpg" width="238" height="370" object-fit="contain"/>

</div>
</div>

<h2 id="setup" >Setup</h2>

### Clone the repo

```bash
git clone https://github.com/gabriel-frattini/theOrchard
```

### Install dependencies

```bash
npm install
```

### Create a database

- [Create a PlanetScale database](https://docs.planetscale.com/tutorials/planetscale-quick-start-guide#create-a-database)
- Create a [connection string](https://docs.planetscale.com/concepts/connection-strings#creating-a-password) to connect to your database. Choose **Prisma** for the format
- **Alternatively**, your PlanetScale database and connection string can be generated using the [pscale CLI](https://github.com/planetscale/cli) or GitHub Actions. [View instructions](doc/pscale-actions-setup.md).
- Set up the environment variables:

```bash
cp .env.example .env
```

- Open `.env` and set the `DATABASE_URL` variable with the connection string from PlanetScale
- Create the database schema:

```bash
npx prisma db push
```

### Configure Cloudinary

- Get your api key, api secret and cloud name from [cloudinary](https://cloudinary.com/)
```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Running the app locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

One-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplanetscale%2Fbeam)

⚠️ Remember to update your callback URLs after deploying.
