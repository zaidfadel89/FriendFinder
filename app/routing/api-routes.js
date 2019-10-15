// \\ youtube refrence
// requiring friends file
var friends = require('../data/friends.js');
// app can be use in difirent files bcs the  module.exports
module.exports = function(app) {
  // get evarything
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });
  // post to friends file
  app.post('/api/friends', function(req, res) {
    var totalDifference = 0;
    // creating varibails
    var bestMatch = {
      name: '',
      photo: '',
      friendDifference: 1000
    };
    var userDate = req.body;
    var userName = userDate.name;
    var userScores = userDate.scores;
    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });
    userDate = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };
    console.log('Name:' + userName);
    console.log('User score' + userScores);
    var sum = b.reduce((a, b) => a + b, 0);
    console.log('Sume of user score' + sum);
    console.log('Best match friend' + bestMatch.friendDifference);
    console.log(
      '+++++++++++++================================================'
    );
    for (var i = 0; i < friends.langth; i++) {
      totalDifference = 0;
      console.log('total Diff' + totalDifference);
      console.log('Best match friend' + bestMatch.friendDifference);
      // creating var and function to git score total for frinds
      var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
      console.log('Total friend score' + bfriendScore);
      totalDifference += Math.abs(sum - bfriendScore);
      console.log(
        '---------------------------------------->' + totalDifference
      );
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
      console.log(totalDifference + 'total difference');
    }
    console.log(bestMatch);
    console.log(userDate);
    console.log('New user added');
    console.log(userDate);
    res.json(bestMatch);
  });
};
