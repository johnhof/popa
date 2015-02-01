var mon = require('mongoman');

mon.register('Repo', {
  updated   : mon().date().default(new Date()).fin(),
  full_name : mon().string().required().fin(),
  readme    : {
    encoding : mon().mixed().fin(),
    content  : mon().string().fin()
  },
  languages   : mon().mixed().fin(),
  name        : mon().string().required().fin(),
  href        : mon().string().required().fin(),
  description : mon().string().fin(),
  forks       : mon().number().default(0).fin(),
  watchers    : mon().number().default(0).fin(),
  stargazers  : mon().number().default(0).fin(),
  owner       : {
    name : mon().string().required().fin(),
    href : mon().string().required().fin()
  },
  open_pulls    : [{
    title    : mon().string().required().fin(),
    href     : mon().string().required().fin(),
    number   : mon().number().required().fin(),
    labels   : mon().array().fin(),
    submitter : {
      name   : mon().string().required().fin(),
      avatar : mon().string().required().fin()
    }
  }],
  open_issues   : [{
    title    : mon().string().required().fin(),
    href     : mon().string().required().fin(),
    number   : mon().number().required().fin(),
    labels   : mon().array().fin(),
    assignee : {
      name   : mon().string().fin(),
      avatar : mon().string().fin()
    }
  }],
  contents : [{
    name : mon().string().required().fin(),
    type : mon().string().required().fin(),
    href  : mon().string().required().fin()
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
      return (new Date() - this.updated) > dayInMs;
    }
  }
})