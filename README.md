# Bizwallet!

# How to Run

## Fresh Install

### Cloning the Repository

The first step is to clone the bizwallet source code to your local computer.

Open an empty terminal window and if you have not done so already clone bizwallet by running.

```
git clone git@github.com:CoquiCoders/bizwallet.git
```

Now change directory into bizwallet's source code folder.

```
cd bizwallet
```

### Installing node dependencies

The second step is to install the dependencies and open source libraries bizwallet uses.

Simply run this command while in the bizwallet source code folder:

```
npm install
```

After it's done your project should have a new folder called *node_modules*.

### Installing and Initializing the local database

We are using PostgreSQL as our database management system. In order to run bizwallet you need to have a local version of PostgreSQL running on your computer.

For Mac OSX users we reccommend installing [postgresapp](http://postgresapp.com). After installing it run this line to link the database to the `psql` command:

```
echo "export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.3/bin" >> ~/.bash_profile
```

Now open the Postgresapp open it. (You should have a black elephant on your computer's top bar)
**Note**: You have to open Postgres every time you want to run the project.

We need to initialize the database so run this command in the terminal window:

```
psql -f config/init.sql
```


### Running bizwallet

We use a tool called [gulp](http://gulpjs.com/) to run the project. Let's install that now.

```
npm install -g gulp
```

Finally to run the project run this command:

```
gulp
```

Your project should be available at [localhost:3000](http://localhost:3000)

## Already Installed

In a new terminal window, change directory into the bizwallet folder

```
cd path/to/folder/bizwallet
```

After you change directory to the bizwallet folder, run this command:

```
gulp
```

## Common Issues

Some common issues that could give you errors when you run the project, and how to solve them

* New dependencies where added (run `npm install`)
* Make sure you are in the bizwallet folder (run `cd path/to/bizwallet`)
* @MrMaksimize or @chrisrodz broke something (ping us to fix it)
