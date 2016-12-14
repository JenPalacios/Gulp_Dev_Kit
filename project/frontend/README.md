# Gulp Dev Kit

### by { colochos }

### Quick Overview
I created this repo to easily be able to use Gulp in my future projects and to share it with whoever wants to use it, that includes beginners and advanced programmers. So if you like it, please star it.

If you have any suggestions on how to make this better, please let me know.

### What does this Gulp file include?

The Gulp-Starter-Kit will achieve the following:
* A Dev and Build environment
* Compile your SASS and minify the CSS file.
* Add necessary vendor prefixes to your CSS.
* Compile your Pug files and minify them.
* Concatenate and minify your JavaScript files.
* Minify images
* Inline Critical CSS to optimize site's performance

### How to download this repo to your machine
1. Click on ```Fork``` (this will create a copy of this repo in your GitHub)
2. You can either clone  the repo or download a zip file to your local machine.

##### To **clone** the repo:
  1. Open the terminal
  2. Cd into your Sites directory
  3. Run
  ```
  git clone https://github.com/[yourUserName]]/Gulp-Starter-Kit.git
  ```
  (don't forget to modify [yourUserName])
  4. Cd into "Gulp-Starter-Kit"
  5. Change the name from "Gulp-Starter-Kit" to your project's relevant name by running
  ```
  mv /Users/[yourUserName]/Sites/Gulp-Starter-Kit /Users/jPalacios/Sites/newName
  ```

##### To **download** the repo:
  1. Click on ```Clone or download```
  2. Click on Download ZIP
  3. Save it in your Sites directory
  4. Unzip the folder
  5. Change the name from "Gulp-Starter-Kit" to your project's relevant name


### How to start using this repo
1. Open the terminal and cd into this repo.
2. Run "gulp" -- This will run your dev environment
3. When you are ready to build your site, run "gulp build"
4. Run "gulp critical" to add inline CSS styles to the elements above the fold.
