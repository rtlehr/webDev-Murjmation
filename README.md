# How to use webDev-murjmation

### Environment philosophy

When I develop a new site/application I like to break things up into understandable files.  I separate out all the JS classes into one file each and the different CSS media-queries into there own separate files. this environment is created to allow that and to then compile all the JS files and CSS files into 1 file each to require as few calls to the server as possible.

This is, by no means, the way **IT SHOULD BE DONE** this is how I work, and only one of about a million ways to set up a development environment.

This is a brief explantion of setting up a Murjmation site.  For details on how to use the framework, see the Wiki.

### Structure and explanation 

#### _development
 - **css**
   - **libs**
     - **layout.less** - LESS mixin to create columns for layout(LESS unequalColumns, LESS equalColumns at http://codepen.io/rtlehr/)
     - **lesshat.less** - Set of LESS mixins to help create advanced CSS (http://lesshat.madebysource.com)
     - **mixins.less** - Set of LESS mixins to help create advanced CSS
     - **standard-css.less** - Set of CSS resets and common CSS styles
     - **styleGuide.less** - Set up the site colors, fonts and any other common styles in the site
   - **module-mediaQueries** - There are 3 media breaks, desktop, tablet, mobile
     - **desktop-less** - all the desktop querie LESS files for the site live here.  These get compiled into the *desktop.less* file one dir up.
     - **mobile-less** - all the mobile querie LESS files for the site live here.  These get compiled into the *mobile.less* file one dir up.
     - **tablet-less** - all the tablet querie LESS files for the site live here.  These get compiled into the *tablet.less* file one dir up.
     - **desktop.less** - Holds all the LESS for the desktop queries
     - **mobile.less** - Holds all the LESS for the mobile queries
     - **tablet.less** - Holds all the LESS for the tablet queries
   - **application.less** - the LESS that uses the desktop.less, mobile.less, tablet.less files in the module-mediaQueries to create the site CSS (this uses a mobile first philosophy)
|
 - **js** - all the JS files in here get combined into a single "application.js" file the site uses.  This is where all the course function .js should live.
   - **application.js** - the site initial JS class
 - **Murjmation** - This is the development of the Murjmation framework. These files get compiled into Murjmation.js in *_production/assets/js/murjmation* folder.

#### _production
- **assets** - All the items needed to display and run the site are stored in here
  - **css** - All the CSS from _development is compiled into here.
    - **frameworks** - CSS frameworks such as, jQuery UI are stored here
    - **images** - images used by jQuery UI
    - **application.css** - All the LESS and CSS in *_development/css* are compiled here
    - **application.min.css** - A minified version of application.css
  - **data** - JSON and XML files
  - **images** - Site images and graphics
  - **js** - All the JS files for the site 
    - **frameworks** - JS frameworks, such as jQuery, jQuery UI
    - **application.js** - All the JS from *_development/js* are compiled here
    - **application.min.js** - A minified version of application.js
- **murjmation** - Holds instruction, and sample files
    - **Murjmation-setup.js** - The setup file for the murjmation course
    - **Murjmation.js** - The Murjmation framework
    - **Murjmation.min.js** - Minified version of murjmation.js
- **index.html** - default page for the site
- **index.1.html** - test file that get's loaded into index.html
- **index-uiTheme.html** - jQuery UI theme page 

**.gitignore** - Tells GIT what files to NOT track.  (node_modules do not get tracked)

**bs-config.js** - node.js lite-server config file.  auto loads *_production/index.html*

**GrunFile.js** - instructions for grunt.js

**package.json** - downloads all the npm and grunt tools to run the enviroment

**README.md** - this readme

### Installation and Set-up

#### Installation (You only need to do this if the items are not already installed)

You need to install some tools before you can run the environment.

install Node.js (https://nodejs.org/en/)

install Gruntjs (https://gruntjs.com/getting-started)

install GIT (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Download or Fork this repository from Github (https://github.com/rtlehr)

#### Set-up

Open a terminal and navigate to the root of the environment and install all the utilities needed to run the environment (*package.json* is used to download the utilities).

To begin the download type, this will create a *node_modules* folder that holds all the **node.js** files

```sh
npm install
```

on a MAC you may need 

```sh
sudo npm install
```

once the downloading is complete run the environment by typing

```sh
npm start
```

A browser window should open with the *_production/index.html* page loaded.

#### What to expect when it's running

The environment will compile (using Gruntjs *watch* tool) everytime you edit somthing in the *_development* folder.  After everything is finished compliling the web page will reload in the browser window.

The page will reload when the *index.html* gets changed.

#### To stop Gruntjs

```sh
ctrl + c
```
