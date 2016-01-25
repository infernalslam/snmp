    var express = require('express');
    var app = express();
    var snmp = require('snmp-native');
    var util = require('util');
    var bodyParser = require('body-Parser');
    var host = '10.4.15.1'; //fitmwifi
    var community = 'public';

		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: false }))

    var session = new snmp.Session({ host: host, community: community });
    var oid = [1, 3, 6, 1, 2, 1, 1, 1, 0];



      var Name = session.get({ oid: oid }, function (err, varbinds) {
         var vb

             if (err) {
                 console.log(err);
             } else {
                 vb = varbinds[0];
                 console.log(varbinds[0])
                 console.log('The system description is "' + vb.value + '"');
             }
                  session.close();
      })

      app.get('/', function (req, res) {
         res.send(Name);
      });
