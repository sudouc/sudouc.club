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
The website should now automatically build and deploy when a new version merged or pushed into the Main branch.

For more information on how this works, check the github actions associated with this project. Old instructions for building a production-ready version of the site are retained below, in case it's ever useful for someone.

#### You should no longer need to do this when pushing to production - for manual builds only!

Run `npm run build` to build the production version.  
To push to GitHub pages (currently an ugly work around until we setup CI properly):
- Copy the output of `_site` to `docs`
- Commit and push
- GitHub Pages will use this output as the content for the site 

## Contributing
### Weekly Content Update
*One day we will automate this process... - Jed 22/02/2021*  

Start by checking out the `dev-weekly-update` branch the update the weeks content update with the following files:  

| File | Description |
| --- | --- |
| _includes/events/poster.html | Update the Header, Description, Location (if required), event link |
| _includes/events/future.html | Add any known new events as cards, remove past events |
| _includes/events/past.html | Move past events here, link to write-up |
| events/calendar.ics | Update the calendar with new events. Use a site like [ical.marudot.com](https://ical.marudot.com/) for easy editing. Make sure to set the update URL to `https://sudouc.club/events/calendar.ics` at the end. |
| index.html | ~ line 65 you'll find the this weeks event tag, update it |

Then run a build task and push! Changes get checked and merged.

### TODO
 - Make poster a dynamic element
 - Move common weekly elements to a *shorts* folder for simplicity until the day we make an API
 - Create write-ups on past events
 - Create CI task for building site when pushed to `main`
 - The Sudo Blog
 - Move site to a PWA style and implement push notifications for event updates
