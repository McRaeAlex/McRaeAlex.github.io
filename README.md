## Alexander McRae

A little bit about me:
I am a second year computer science co op student at the University of Victoria. I am from Grimsby, Ontario, which is a town near Niagara Falls. In my free time I enjoy running, coding, and learning in general. I am currently training for a marathon. My favorite programming language is Rust because it confuses me at times and I enjoy that. You can find me on Github, or on mozilla's irc as BearOfJade. 

## Projects
### Rusty Snake
<img src="https://raw.githubusercontent.com/McRaeAlex/McRaeAlex.github.io/master/Rust_Logo.png" height="250"/>

Rusty Snake is a battle snake server written in rust. It uses rocket as its http framework and Serde to serialize and deserialize json. I created Rusty out of curiosity, being someone who has taught themselves Java in high school and python the summer before University I didn't understand what happens at lower levels. This is why I choose to pick up rust. Rust made me realize how much highlevel languages like python and java abstract for you. Another benefit from rust was that its fast and I think that this open up a bunch of options on the things I can do with this snake. At the current time I am planning to add machine learning, but due to the faster speeds I could run complex algorithms like a* in a fraction of the time compared to my past snakes and possibly run multiple algorithms and compare results.

`Why:` I wanted to learn rust and I needed a battle snake for next year

`What I learned:` I learned rust and rocket as well as a lot of lower level stuff like the difficulties of memory management, and the stack vs the heap.

`Future plans:` My next goal is to add machine learning to this project. 

### Whale Tracker
![Google Maps Logo](https://raw.githubusercontent.com/McRaeAlex/McRaeAlex.github.io/master/googlemaps.png)

This is a website that uses the google maps api and plots different types of whales on the map. When you click on a whale it shows more detailed data about the whale such as: name, age, data tagged, etc.. I am also looking to draw the path the whale took over the last 30 days with possibilities of that the number of days be a option for the user to play with. I would say this is very similar to the snapchat map which you can see here but for whales.

`Why:` I made this after watching Blackfish a documentary about orcas and how poorly they are treated in captivity, I hope my website gets people to be interested in them and acknowledge how far they travel, showing people that putting them in a pool is unjust.

`What I learned:` I learned how to use the google maps api and a little bit about html injection.

`Future plans:` I want to finish this completely add actual whales and possible other marine life if I cannot get whale data. 

### WebApp
![Flask Logo](https://raw.githubusercontent.com/McRaeAlex/McRaeAlex.github.io/master/flask.png)

This is currently in progress but I want to expand my website, currently I have a working prototype on Heroku however do to me having a plan with HostGator I will keep adding to it until my plan is up at which point my website will become the WebApp.
I use flask for the backend and bootstrap for the front end. Database is done through Postgres and mySQL. Although it is currently very simple with just the ability to read the notes and I put and download them I will be adding the ability to upload notes remotely.

`Why:` I really think that the web is the future and the more I learn about it the better. Also, I really enjoy web development in general, whenever I get stuck on a problem I can always finish another aspect of the site and come back to it later.

`What I learned:` I learned a ton; SQL, HTML templating, bootstrap, Flask and a bunch of other web development technologies like DNS, domain name propagation, and http.

`Future plans:` I want to turn this into an elaborate WebApp with a database and the whole gig. I will wait until my plan with HostGator is up however. 

### Battle Snake
<img src="https://raw.githubusercontent.com/McRaeAlex/McRaeAlex.github.io/master/battlesnake.png" height="200"/>

 When I saw this competition, I knew I had to do it, it seemed like the perfect opportunity to put what I have learned in class and by myself to the test. I got together a group of guys and we started, it was all our first time and we were all first-year students. Our first step was coming up with a strategy, at first, we were talking convolutional neural nets and advanced algorithms but quickly were hit in the face with a reality check, non-of us had any experience with neural nets and a majority of our group didn't even know python yet. We took a step back and discussed. In the end we had our strategy, don't die.

Our bot does the following:
1. reads in all the snakes from the game server
2. creates a 2d array of ints
3. puts all the snakes on the boards adding them to the int at the cell
4. finds where all the other snakes could possibly go next and if they are bigger than us (they kill on collision) we mark it to stay away, but if its smaller than us we mark it to move there so we can kill it.
5. then we read in the food and add it to the space on the board
6. look around out snake and go to the smallest value. If two values are the same take a random one.

The representations looks like this:
-3 there is food
-2 there is a bot we can kill
0 there is an open space no snake will be on the next turn
4 a snake may be there on the next turn that will kill us
5 a snake body part
example board: note if there is a snake where we could possibly move next then the two values are added so 4 (we may be there next turn) + 5 (opposing snake body)
{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,-3,0,0,0,0,0,4,5,5,5,5,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,4,5,4,0,0,0,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},

The main issue with this algorithm however is that it only accounts for the next turn not any turns after that, so often it traps itself in itself. To avoid this, we decided that we would still go to the lowest value but instead of it being random where we go if they are the same instead we would use a* path finding to see which gives us the longest route and take that.

`Why:` I did this so I gained experience in a group and because I thought it looked awesome.

`What I learned:` I learned a how to apply algorithms and data structures in a real-world environment. I also learned how to problem solve as a team.

`Future plans:` I am planning on doing this again next year but maybe with a different plan probably, a neural net.

### WebSite

My website is something I always wanted to do, so at the beginning of the school year (September 2017) I started it. I used W3 schools to learn html, CSS, and JavaScript and was quickly building many pages. My one issue I was having with all the iterations of my website was how it looked, it seemed no matter how much CSS I changed I never could really make it look like a nice website. That’s when I found bootstrap, using the docs I learned v4 and quickly my website started looking modern and clean. This project from start to end took me about 2 weeks (learning included).

`Why:` I made this website because I think the web is the future and I want to join the fun and learn about it.

`What I learned:` I learned basic web development; html, CSS, and JavaScript. I quickly learned that writing all of my CSS from scratch was uncommon so I picked up bootstrap. I also learned a bit of SCSS.

`Future plans:` I want to turn this into an elaborate WebApp with a database and the whole gig. I will wait until my plan with HostGator is up however. 