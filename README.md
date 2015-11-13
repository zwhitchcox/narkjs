#nark#
Node, Angular, RethinkDb, Koa Framework

Made for my personal use and the websites I design.

Key technologies:

gulp, angular material, jade, sass

## Installation

1. clone the github repository using your app name as the directory

	```shell
	git clone http://github.com/zwhitchcox/narkjs [YOUR APP NAME]
	```
2. [install rethinkdb](https://www.rethinkdb.com/docs/install/)

3. install dependencies
	```shell
	npm i
	```

4. update config.js with your gmail credentials

	You may need to ["Allow Less Secure Apps"](https://www.google.com/settings/security/lesssecureapps)
	in your gmail account (it's all the way at the bottom). You also may need to 
	["Allow access to your Google account"](https://accounts.google.com/DisplayUnlockCaptcha)

5. profit

##FAQ

### General

#### How do I add style?

Nark utilizes the [Sass](http://sass-lang.com/) language for style.
You can learn all about it from [this video](https://www.youtube.com/watch?v=wz3kElLbEHE)
or just learn as you go. It's pretty easy to pick up.

#### How do I write server side code?

all files with the extension ```sjs``` will be dependency injected with ```nark```. from here, you can do all kinds of things like routing, events, or whatever

```js
module.exports = logs

function logs(nark) {
  nark.on('auth added', function() {
    nark.router.get('/api/logs', nark.auth.isAuth(),function* logs() {
      this.body = [{
          id: 1,
          description: 'Started Job Process!',
        } ,{
          id: 2,
          description: 'Completed Job Process!',
          date: new Date
      }]

    })
  })
}
```

#### How do I write server site code without injecting the nark dependency and running it with gulp?

Use the file extension `ijs`

### Test Driven Development (TDD)

#### How do I write a test file?

using the file extension `tjs` will cause gulp to ignore your test code,
and mocha will automatically look for this file extension when you use ```npm test```

#### How do I include nark in my tests?

just use ```require([PATH TO NARK])([CONFIG OBJECT])``` like so:

```js
'use strict'
const assert = require('assert')
let config = { 
    rethinkdb: {
      host: "localhost",
      port: 28015,
      authKey: "", 
      db: "test"
    }   
  },  
  n = require('../../nark')(config)

require('co-mocha')
```

#### How do I write a test function?

after you include nark, you can make sure it is built like so:

```js
describe('User Model testing', function() {
  it('should build node properly', function *(done) {
    n.on('built',done)
  })  
```

and then continue building your code like normal:

```js
  it ('should create a user', function *() {
    User = n.User
    let user = new User({email:'zane',password:'password'})
    assert.equal(typeof user, 'object')
  })  
  it('should store properties passed when instantiated', function*() {
    let email, user
    email = 'zane'
    user = new User({email: email})
    assert.equal(user.email, email)
    user.delete()
  })  
  it('should assign an id after being saved', function *() {
    let email, password, user
    email = 'zane'
    password = 'password'
    user = new User({email:email,password:password})
    yield user.save()
    assert(user.id)
    user.delete()
  })
```

### Routing

#### How do I route REST API requests?

use ```nark.router```

```js
nark.router.get('/api/logs', function* logs() {
  this.body = [{
      id:1,
      description: 'Started Job Process!',
      date: new Date() - 60000 * 50
    }, {
      id:2,
      description: 'Completed Job Process!',
      date: new Date()
  }]
})
```

### Login

#### How do I set up gmail to email new users?

edit the `config.js` file with your credentials


#### How do I check if a user is logged in on the client side?

use the abstract state, 'cl' (for 'client logged in'), which will redirect to the log in page if the user is not logged in

```js
$state('cl.mypage', {
  url: '/myurl',
  templateUrl:'mytemplate.html',
  controller: 'MyCtrl',
  controllerAs: 'mine'
})
```

#### How do I check if a user is logged in on the server side?

use the ```nark.auth.isAuth``` function to check if the user is logged in before serving the content

```js
nark.router.get('/api/logs', nark.auth.isAuth(), function* logs() {
  this.body = [{
      id:1,
      description: 'Started Job Process!',
      date: new Date() - 60000 * 50
    }, {
      id:2,
      description: 'Completed Job Process!',
      date: new Date()
  }]
})
```

### Troubleshooting

*How do I fix an EADDRINUSE error?*

on Unix systems, you can type ```killall gulp node```. however, this will also kill
any other node or gulp processes you have.

if this behavior is undesirable, you can search for the process ids with ```ps aux | grep "node|gulp"```
and kill the specific processes you want to kill with ```kill [process id] [process id]```
