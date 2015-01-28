var mon = require('mongoman');

mon.register('Repo', {
  updated   : mon().date().default(new Date()).fin(),
  full_name : mon().string().required().fin(),
  readme    : {
    encoding : mon().mixed().fin(),
    content  : mon().string().fin()
  },
  languages     : mon().mixed().fin(),
  name          : mon().string().required().fin(),
  href          : mon().string().required().fin(),
  description   : mon().string().fin(),
  network_count : mon().number().fin(),
  owner         : {
    name : mon().string().required().fin(),
    href : mon().string().required().fin()
  },
  open_pulls    : [{
    title    : mon().string().required().fin(),
    href     : mon().string().required().fin(),
    labels   : mon().array().required().fin(),
    submitter : {
      name   : mon().string().required().fin(),
      avatar : mon().string().required().fin()
    }
  }],
  open_issues   : [{
    title    : mon().string().required().fin(),
    href     : mon().string().required().fin(),
    labels   : mon().array().required().fin(),
    assignee : {
      name   : mon().string().fin(),
      avatar : mon().string().fin()
    }
  }]
}, {
  middleware : {
    pre : {
      save : function (callback) {
        this.updated = new Date();
        return callback();
      }
    }
  },
  statics : {
    isExpired : function () {
      var dayInMs = 86400000;
      console.log(new Date() - this.updated);
      return (new Date() - this.updated) > dayInMs;
    }
  }
})