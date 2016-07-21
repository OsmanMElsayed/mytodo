# Intro
*mytodo* is a an application that allows you to create tasks. each task can be created with a description, reminder date/time, 
a due date/time and a category. *mytodo* also shows how many tasks per category are due in the next week.

# Get Up & Running
Getting the app up & running is a piece of cake. All u need is to make sure you have the following installed:
1. NodeJS
2. Gulp

When the solution is opened using *Visual Studio 2015*, VS will recognize the `package.json` file & will restore the node modules.
However, VS is not mandatory to run the app. The other option would be executing `npm install` on the app root folder.

Finally `gulp serve` command will trigger a build & after the will hook-up *Browsersync* to serve the app files through 
http://localhost:3000

# Dependencies
*mytodo* is built on top of the following frameworks/libraries:
1. React.js
2. d3.js
3. linq.js
4. moment.js
5. Twitter Bootstrap
