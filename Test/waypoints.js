var wp1 = '{  "waypoints": [ ' +
            '"start":{"ie101":1,"ie105":1,"w2":1,"w1":1}' +
            '"w2":{"start":1,"ie102":1,"w1":1,"w4":1,"ie104":1}' +
            '"w4":{"w2":1,"ie104":1,"w5":1}' +
            '"w1":{"start":1,"ie105":1,"w5":1,"w2":1}' +
            '"ie101":{"start":1,"ie105":1,"ie102":1}' +
            '"ie102":{"w5":1,"ie101":1}' +
            '"ie104":{"w4":1}' +
            '"w5":{"ie102":1,"w4":1,"w1":1,"w2":1,"w6":1,"butean":1}' +
            '"butean":{"w5":1,"wcm":1}' +
            '"w6":{"w5":1,"butean":1,"wcm":1}' +
            '"wcm":{"butean":1,"w6":1,"wcf":1}' +
            '"wcf":{"wcm":1,"w7":1}' +
            '"w7":{"wcf":1,"ie111":1,"ie112":1,"ie113":1}'
        ']}';
var waypoints = JSON.parse(wp1);
        