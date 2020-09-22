# HomeOrder

Please comply by the folder definitions that I have written below. These rules are written so that everyone can easily access and work with files. The folder definitions might get larger as we add more functionality.

If I have written any comments on the files, they are guides for where you should add functionality to keep the code clean and easy to read.

If you have any questions on this then PM me.

## Github Projects

On our HomeOrder repository there is a projects tab. We have three projects backend, frontend and full stack.

- backend: any task purely backend with no frontend interaction goes here
- frontend: any task purely frontend with no backend interaction goes here
- full stack: any task that involves getting the frontend and backend to work together go here

## Frontend Guide

The CSS Library currently being used is [react-bootstrap](https://react-bootstrap.github.io/). Frontend team can decide which CSS Library is best suited to them and refactor the code appropriately.

### Folder Definitions

- pages: If you are writing a file to display a profile page then create that file in this directory.
- components: If you are making a component that needs to be reused then create it in this directory.
- images: All icons and images that are not user inputted are to be stored here. Please name every image according to what it is.

### async/await

In the future when you will make requests from the frontend you have to use axios node package. Instead of using promises use [async/await](https://javascript.info/async-await). Try to use this syntactical sugar for promises as much as possible it will make your life so much easier when you are dealing with asynchronous operations.

```
const displayUsers = async () => {
    const response = await axios.get('/api/getUsers');
    return(<UserCards users={response.data} />);
}
```

In the example above the `await` keyword waits for the database to query and stores those results in the `response` variable.

## Backend Guide

If you are working on the backend of this application please follow the rules and conventions given below.

### Folder Definitions

- middleware: If you are writing any [middleware](https://www.youtube.com/watch?v=_GJKAs7A0_4) functions then please write them in this directory.
- models: If you are writing mongoose schemas and models then make those files in this directory.
- routes: If you are using express routers to modularize the requests then add those files here.

### Express Routing

Please use [express routers](https://expressjs.com/en/guide/routing.html) to modularize your code. Let's say you want to create API endpoints to fetch data about items for sale then write all those API endpoints in Products.js.

### async/await

When you are querying the database you have to usually wait for MongoDB to query the database and give you a result. Previous versions of javascript used promises. Please try to avoid using promises as much as possible because they will make your life difficult. Use [async/await](https://javascript.info/async-await) instead.

```
router.get('/getUsers', async(req,res) => {
    const users = await Users.find();
});
```

In the example above the `await` keyword waits for the database to compile a list of all the users and stores it in the `users` variable.

### .env File

The .env file in the `backend` folder is used to store any secrets such as API keys and so on. Right now we are storing the mongoDB connection string that gives us when we create a cluster. At some point when we make this repository public we can gitignore the .env file so that all our secret variables are hidden.
