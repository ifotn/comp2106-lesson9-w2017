/**
 * Created by RFreeman on 2/8/2017.
 */

// create an array of global variables
module.exports = {
  // db: 'mongodb://localhost/comp2106-w2017' // local mongodb (no auth)
   db: 'mongodb://comp2106-w2017dba:Donotmess17@ds045757.mlab.com:45757/comp2106-w2017',
    facebook: {
      clientID: '240472339748735',
      clientSecret: 'eda6a3173acaf45cef30bc56bf3e248c',
      callbackURL: 'http://localhost:3000/facebook/callback'
    }
};