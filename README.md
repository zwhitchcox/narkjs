#nark#
Node, Angular, RethinkDb, Koa Framework

Made for my personal use and the websites I design.

Key technologies:

gulp, angular material, jade

##FAQ##

### General

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

#### How can I implement test driven development (TDD)?

Using the file extension `tjs` will cause gulp to ignore your test code.

You can build nark in the code you wish to test and instantiate the database like so:

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

Then, you can execute the tests using nark, e.g.

```js
describe('User Model testing', function() {
  it('should build node properly', function *(done) {
    n.on('built',done)
  })  
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
