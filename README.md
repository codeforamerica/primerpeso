# PrimerPeso

# How to Run

# Dependencies
* Postgresql 9.3 - DB
* NodeJS 0.10
* Redis - Sessions
* Mandrill - E-Mail
* TravisCI - CI

## Fresh Install

### Cloning the Repository

The first step is to clone the PrimerPeso source code to your local computer.

Open an empty terminal window and if you have not done so already clone primerpeso by running.

```
git clone git@github.com:codeforamerica/primerpeso.git
```

Now change directory into primerpeso's source code folder.

```
cd primerpeso
```

### Installing node dependencies

The second step is to install the dependencies and open source libraries primerpeso uses.

#### For Mac OSX

Simply run this command while in the primerpeso source code folder:

```
npm install

```

#### For Ubuntu 14.04

For the distro stable version, run:


```
sudo apt-get update
sudo apt-get install nodejs
```

There is a naming clonfict in ubuntu for the node.js package. Run the following to create a symlink to avoid issues.

```
ln -s /usr/bin/nodejs /usr/bin/node
```

For alternate install methods, please refer [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server).

___

After it's done your project should have a new folder called *node_modules*.

### Installing and Initializing the local database

We are using PostgreSQL as our database management system. In order to run primerpeso you need to have a local version of PostgreSQL running on your computer.

#### For Mac OSX

We reccommend installing [postgresapp](http://postgresapp.com). After installing it run this line to link the database to the `psql` command:

```
echo "export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.3/bin" >> ~/.bash_profile
```

We need a new terminal window for this line to take effect. Go ahead and open a new window and change directory to the primerpeso folder.

Now open the Postgresapp. (You should have a black elephant on your computer's top bar)
**Note**: If you have the elephant on the top bar Postgres is already running
**Note**: You have to open Postgres every time you want to run the project.

We need to initialize the database so run this command in the terminal window:

```
psql -f config/init.sql
```

Now run this command to load some sample data into the database:

```
psql primerpeso < config/dump.sql
```

#### For Ubuntu 14.04

Install: 

```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

Log in as the 'postgres' user, that is associated with the PostgreSQL Role:
```
sudo -i -u postgres
```

Copy the file config/dump.sql to a directory such as /tmp, where the postgres user has access to. Switch to that directory.


Logged in as the 'postgres' user, you can use the pg_dump tool to load some sample data into the database:
```
createdb primerpeso
pg_dump primerpeso < config/dump.sql
```


### Installing redis:

#### For Mac OSX
Make sure you have [Homebrew](http://brew.sh/) installed and run this command in a terminal window:

```
brew install redis
```

#### For Ubuntu 14.04

Please refer to documentation [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis). In summary:

Download packagage and Redis tar ball:
```
sudo apt-get install build-essential
sudo apt-get install tcl8.5
wget http://download.redis.io/releases/redis-2.8.9.tar.gz
 
```

In desired directory, unzip, make and install:
```
tar xzf redis-2.8.9.tar.gz
cd redis-2.8.9
make
sudo make install
```

To run:
```
cd utils
sudo ./install_server.sh
```

### Creating your environment variables file

We use environment variables to connect to our local database and tell primerpeso to run in "Development" mode. We specify these things in a special file named ".env" (Yes, with the period):

* Create an empty file named ".env" `touch .env`
* Copy the contents of ".env_example" into it  `cat .env_example > .env`
* If you don't know your terminal username run `whoami` to find it
* Open the ".env" file in a text editor.
* Find the "DATABASE_URL" variable, change the part where it says "username" into your terminal username

### Running PrimerPeso

We use a tool called [gulp](http://gulpjs.com/) to run the project. Let's install that now.

```
npm install -g gulp
```

Finally to run the project run this command:

```
gulp
```

Your project should be available at [localhost:3737](http://localhost:3737)

## Already Installed

In a new terminal window, change directory into the primerpeso folder

```
cd path/to/folder/primerpeso
```

After you change directory to the PrimerPeso folder, run this command:

```
gulp
```

## Importing and Exporting DB.

### Dump

* `pg_dump bizwallet --format=c --file=db_dump_a.tar.gz --no-owner`

### Restore

* From Heroku = `dropdb bizwallet; heroku pg:pull DATABASE_URL bizwallet; gulp migrate`
* From Dump = `dropdb bizwallet; createdb bizwallet; pg_restore db_dump_a.tar.gz --clean --dbname=bizwallet --create`

## Common Issues

Some common issues that could give you errors when you run the project, and how to solve them

* New dependencies were added (run `npm install`)
* Make sure you are in the primerpeso folder (run `cd path/to/primerpeso`)
* @MrMaksimize or @chrisrodz broke something (ping us to fix it)
