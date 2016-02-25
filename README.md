Watson in 30 Minutes
====================

Patrick Wagstrom &lt;pwagstro@us.ibm.com&gt;

This is a sample application for my IBM InterConnect 2016 talk "Watson in 30
Minutes". Because it ties into a couple of time limited services, particularly
around getting credentials for the Natural Language Classifier service, it may
not be much use after InterConnect 2016.


Design Principles
-----------------

The goal was to create a simple project that could showcase some of the great
stuff that you can do with IBM Watson Natural Language Classifier without
needing to know a lot about frameworks or be an expert in machine learning. We
have chosen two of the most popular software projects in the world to hake make
this vision a relaity. The server is written in Node.js with the express
middleware. The frontend is written in very basic HTML and jQuery to minimize
the differences between the skill of individuals.


Using the Project
-----------------

There are two ways to use the project, you can either interact entirely using the
server process, or you can use the shell scripts provided.

The basic process is that in order to use the Watson Developer Cloud services you
need a set of credentials. For this demonstration I've created a special service
that will connect and get a short term set of credentials you can use to train
a classifier. These credentials will only work for a couple of days, if you'd
like to do something more extensive, you'll want to [create an instance of the
Natural Language Classifier service][nlc] in your own Bluemix space.

### Using the node packages

**Step 1:** got into the `node` directory and run `npm install` to install dependencies.

**Step 2:** from the `node` directory run `npm start` to start the application. It will
detect that it lacks credentials and automatically grab you a set of temporary credentials.

**Step 3:** in the root directory of this project edit the file `training.csv` to add in
your own training data.

**Step 4:** from the `node` directory run `npm start` to start the application again. It
will detect that it has credentials, but does not yet have an classifier. It will initiate
a classifier training and then exit.

**Step 5:** Now that you have credentials for the Natural Language Classifier
Service and you have started a classifer training run, run `npm start` again
(this is the third time) to start up the local web server.

**Step 6:** open a web browser and visit https://localhost:8080/ to try out your classifier.
You'll need to wait for your classifier to train. Depending on the size of your data, this
can take anywhere from a few minutes to a few hours. The page will automatically update once
every 10 seconds as it checks on the status of your classifier. Once your classifier is
loaded it should bring up the simple page for you ask questions.

### Using the shell scripts

To set up and run everything with the shell scripts you'll go through the following
steps.

**Step 1:** run `getcreds.sh`. This will connect to the custom Bluemix service and
get a set of credentials and save them in top level directory of this project in
a file called `credentials.json`.

**Step 2:** edit `training.csv` to create your own training data. This is what will
be used to train the Natural Language Classifier Service.

**Step 3:** run `train.sh` to start a classifier training. When you run this it will
create file called `classifier.json` that contains the information about classifier
that is training. Both this file and `credentials.json` from Step 1 must be in the top
level directory for the node based web server to work.

**Step 4:** go into the `node directory` and run `npm install` to install dependencies.

**Step 5:** from the `node` directory run `npm start` to start the local web server.

**Step 6:** open a web browser and visit https://localhost:8080/ to try out your classifier.
You'll need to wait for your classifier to train. Depending on the size of your data, this
can take anywhere from a few minutes to a few hours. The page will automatically update once
every 10 seconds as it checks on the status of your classifier. Once your classifier is
loaded it should bring up the simple page for you ask questions.

License
-------

This project is licensed under the terms of the Apache 2.0 license. See the
file LICENSE for more details.

Copyright &copy; 2016 IBM Corporation
