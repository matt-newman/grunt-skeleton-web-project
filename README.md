#README.md

This is a project skeleton that suits my setup needs and should be a fast way to get started working on a new project whilst having some basic nice-to-have's such as:
* concatination
* minification
* image optimisation
* js hinting
* unit-test setup
* etc.

## Getting Started:

Just clone the repo then delete the .git folder

You'll need to have npm, grunt, grunt-cli installed

Run:
```
> npm install
> grunt
```

That'll run the grunt default task which currently is set to prep everything for release, and spool up a server, I might change it later to just run watch so that it's ready to start working on.

//TODOs:
* add js testing framework (jasmine)
* add grunt-contrib-newer
* change default grunt task to 'watch'
* source-mapping chain for sass->css->min.css
* cache-buster mechanism