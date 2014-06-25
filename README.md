# Bizwallet!

## How to Run

### Fresh Install

Open an empty terminal window and if you have not done so already clone the project by running.

```
git clone git@github.com:CoquiCoders/bizwallet.git
```

Now change directory into the project.

```
cd bizwallet
```

You need to install the project's dependencies, so run:

```
npm install
```

Since we are using PostgreSQL for our database, you need to have local Postgres. For Mac OSX users we reccommend installing [postgresapp](http://postgresapp.com).

If you already installed postgresapp open it. (You should have a black elephant on your computer's top bar)

Finally to run the project run this command:

```
gulp
```

Your project should be available at [localhost:3000](http://localhost:3000)

### Already Installed

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
