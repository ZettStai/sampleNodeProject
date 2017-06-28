Read the [wiki](https://github.com/robeau/sampleNodeProject/wiki) to see the process we've gone through in creating this web application.

## Sample Node Application

#### Running the app locally
In the terminal, go into your project folder and clone the repo. Replace \<fork\> with the name of fork.
```
$ git clone https://github.com/<fork>/sampleNodeProject
```

Cd into sampleNodeProject/ and install the dependencies.
```
$ npm install
```

Add a mongo URI to line 9 of index.js.
```
const url = 'mongodb://<username>:<password>@<database>.mlab.com:<port>/demo';
```

Start the server.
```
$ npm start
```

Open a browser to [http://localhost:8081](http://localhost:8081).
