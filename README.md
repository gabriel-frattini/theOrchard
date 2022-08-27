
<div align="center">
<h2 align="center">The Orchard Holiday Home &#127796;</h2>
<img src="https://github.com/gabriel-frattini/theOrchard/blob/main/src/images/showcase/theorchard.jpg" width="720" height="400" />


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

## Setup

### Clone the repo

```bash
git clone https://github.com/gabriel-frattini/sideclub
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

### Configure authentication

- [Configuring GitHub authentication](doc/github_setup.md)

Sideclub uses [NextAuth.js](https://next-auth.js.org/), so if you prefer to use one of the [many providers](https://next-auth.js.org/providers/) it supports, you can customize your own installation. Simply update the [`lib/auth.ts`](/lib/auth.ts#L11) file to add your own provider.

## Running the app locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Authenticating with GitHub

## Deploying to Vercel

One-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplanetscale%2Fbeam)

⚠️ Remember to update your callback URLs after deploying.
