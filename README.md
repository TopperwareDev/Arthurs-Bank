# Arthurs-Bank
The Arthur bank website, is created by Arthur, Lang, and eloy because we all share intrestes in coding and developing software.
The goal of this project is to create a website where ecnomy students can convert their cook dolares into "Arthur's"(our digital currency).
As the users have converted their modey into our digital currency, users will be able to participate in many games such as, lottery, blackjack, spinner, and many more to come.

We are building our website with express, and node js, in the hopes of learning the how to build well structured websites.

Roles
Arthur - Backend dev
Lang - Front end
Eloy - Still figuring out the bacics

remember to unintall command line reader for more efficient app

If you come accross -------- contue

killall -9 node - kill all node processes incase server is not starting because another program is already using another port

sudo lsof -i :3000 - will give list of all programs listening to port 3000 <- change this to listen to other ports

sudo lsof -i - to view all open ports

Code to remember for later - -
start server: nodemon server.js

res.clearCookie('name'); // clear cookie
res.cookie('name', 'text'); //writing cookie
req.cookies.name // get cookie value from name
