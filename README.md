# Sudo Website Source Code
Hey there, you found the source code for [sudouc.club](https://sudouc.club/). Take a look around, its all Open Source.

## Development
### Requirements
To begin you'll need to install and configure a few dependencies & build tools, just follow their guides:
 - [Jekyll](https://jekyllrb.com/docs/installation/).
 - [NodeJS & NPM](https://nodejs.org/en/).

 ### Get Started
  - `bundle install` to install the Ruby gems
  - `npm ci` to install NPM packages
  - `npm run start` to compile and launch BrowserSync and visit the dev site at `http://localhost:4000`

### Building for production
Run `npm run build` to build the production version.  
To push to GitHub pages (currently an ugly work around until we setup CI properly):
- Copy the output of `_site` to `docs`
- Commit and push
- GitHub Pages will use this output as the content for the site 