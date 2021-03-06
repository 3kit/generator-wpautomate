'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
const updateNotifier = require('update-notifier');
const pkg = require('../../package.json');
const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000
});


function makeGeneratorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('generator-') === 0 ? name : '' + name;
  return name;
}
module.exports = yeoman.Base.extend({
  prompting: function () {
    notifier.notify();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the  ' + chalk.red('generator-wp-automate') + ' wordpress generator!'
    ));

    var prompts = [{
      name: 'name',
      message: 'Your project name (project name should be lowercase. without sapce, specialcharecter)',
      default: makeGeneratorName(path.basename(process.cwd())),
      validate: function (str) {
        return str.length > 0;
      }
    },{
      name: 'wpdb',
      message: 'DB name',
      default: makeGeneratorName(path.basename(process.cwd())),
      validate: function (str) {
        return str.length > 0;
      }
    },
    {
      name: 'wpdbHost',
      message: 'DB Host name?',
      default: 'localhost'
    },
    {
      name: 'authorName',
      message: 'Your Name?',
      default: 'Yeoman'
    },
    {
      name: 'authorEmail',
      message: 'Your Email?',
      default: 'test@test.com',
      validate: function(str) {
        return str.length > 0;
      }
    },
    {
      name: 'supportURL',
      message: 'Support URL?',
      default: 'http://0effortthemes.com/support/',
      validate: function(str) {
        return str.length > 0;
      }
    },

    {
      type: 'list',
      name: 'themerepo',
      message: 'What theme do you need?',
      choices: [
      'Twentyseventeen',
      'Wpautomate-lite',
      'Wpautomate-pro',
      '_s'
      ],
      filter: function (val) {
        return val.toLowerCase();
      }
    },
    {
      name: 'siteUrl',
      message: 'Site url?',
      default: 'http://localhost/' + makeGeneratorName(path.basename(process.cwd())),
      validate: function(str) {
        return str.length > 0;
      }
    },
    {
      name: 'adminUser',
      message: 'Admin User name?',
      default: path.basename(process.cwd()),
      validate: function(str) {
        return str.length > 0;
      }
    },
    {
      name: 'adminPass',
      message: 'Admin Password?',
      default: path.basename(process.cwd()),
      validate: function(str) {
        return str.length > 0;
      }
    },
    {
      name: 'repoUrl',
      message: 'repository url?',
      default: 'git@bitbucket.org:{{username}}/'+makeGeneratorName(path.basename(process.cwd()))+'.git',
      validate: function(str) {
        return str.length > 0;
      }
    },
    {
      name: 'subrepoUploads',
      message: 'Submodule for uploadrepository url?',
      default: 'git@bitbucket.org:{{username}}/'+makeGeneratorName(path.basename(process.cwd()))+'-uploads.git',
      validate: function(str) {
        return str.length > 0;
      }
    },
    {
      type: 'confirm',
      name: 'testData',
      message: 'Install test data?',
      default: true
    },
    {
      type: 'confirm',
      name: 'childTheme',
      message: 'Create child theme?',
      default: true
    },
    {
      name: 'hostDeployName',
      message: 'Enter deploy host name.',
      default: 'ec2-host',
      validate: function(str) {
        return str.length > 0;
      }
    },
    {
      name: 'hostDeployPath',
      message: 'Enter full path (note exclude project name). [example /var/www/html/]',
      default: '/var/www/html/',
      validate: function(str) {
        return str.length > 0;
      }
    },
    {
      name: 'hostDeployUser',
      message: 'Enter deploy host user name',
      default: 'ec2-user',
      validate: function(str) {
        return str.length > 0;
      }
    }];
    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var scssPath, cssPath, textdomain, packageName, subpackage, repoUrl;
    switch(this.props.themerepo) {
      case 'twentyseventeen':
        repoUrl = 'https://github.com/WordPress/twentyseventeen.git';
        textdomain = 'twentyseventeen';
        packageName = 'WordPress';
        subpackage = 'Twenty_Seventeen';
        break;

      case 'wpautomate-pro':
        repoUrl = 'git@bitbucket.org:itobuztech/wp-automate.git';
        textdomain = 'wpautomate';
        packageName = 'wpautomate';
        subpackage = 'wpautomate';
        break;

      case '_s':
        repoUrl = 'https://github.com/developer-prosenjit/wpautomate.git';
        scssPath = 'sass';
        cssPath = '';
        textdomain = 'wpautomate';
        packageName = 'Wpautomate';
        subpackage = '';
        break;

      default:
        repoUrl = 'https://github.com/developer-prosenjit/wpautomate-lite.git'
        scssPath = 'scss';
        cssPath = 'css/';
        textdomain = 'wpautomate';
        packageName = 'Wpautomate';
    }

    console.log(textdomain);

    // root files
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        'projectName': this.props.name
      }
    );
     this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        'projectName': this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('_bowerrc'),
      this.destinationPath('.bowerrc')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_jshintrc'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    // under gulp-tasks
    this.fs.copy(
      this.templatePath('build.js'),
      this.destinationPath('gulp-tasks/build.js')
    );

    this.fs.copy(
      this.templatePath('cmb2.js'),
      this.destinationPath('gulp-tasks/cmb2.js')
    );
    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath('gulp-tasks/config.json'),
      {
        'scssPath': scssPath,
        'cssPath': cssPath,
        'authorEmail': this.props.authorEmail,
        'authorName': this.props.authorName,
        'supportURL': this.props.supportURL,
        'textdomain': textdomain,
        'packageName': packageName
      }
    );
    this.fs.copy(
      this.templatePath('document.md'),
      this.destinationPath('documentation/document.md')
    );
    this.fs.copy(
      this.templatePath('env-example.json'),
      this.destinationPath('gulp-tasks/env-example.json')
    );
    this.fs.copy(
      this.templatePath('image.js'),
      this.destinationPath('gulp-tasks/image.js')
    );
    this.fs.copy(
      this.templatePath('mail.js'),
      this.destinationPath('gulp-tasks/mail.js')
    );
    this.fs.copy(
      this.templatePath('package.js'),
      this.destinationPath('gulp-tasks/package.js')
    );
    this.fs.copy(
      this.templatePath('pot.js'),
      this.destinationPath('gulp-tasks/pot.js')
    );
    this.fs.copy(
      this.templatePath('script.js'),
      this.destinationPath('gulp-tasks/script.js')
    );
    this.fs.copy(
      this.templatePath('serve.js'),
      this.destinationPath('gulp-tasks/serve.js')
    );
    this.fs.copyTpl(
      this.templatePath('setup.js'),
      this.destinationPath('gulp-tasks/setup.js'),
      {
        'themerepo': repoUrl
      }
    );
    this.fs.copy(
      this.templatePath('styles.js'),
      this.destinationPath('gulp-tasks/styles.js')
    );
    this.fs.copy(
      this.templatePath('readme.md'),
      this.destinationPath('readme.md')
    );
    this.fs.copy(
      this.templatePath('analytics.js'),
      this.destinationPath('gulp-tasks/analytics.js')
    );
    this.fs.copyTpl(
      this.templatePath('setup-wp-cli.js.js'),
      this.destinationPath('gulp-tasks/setup-wp-cli.js.js'),
      {
        'projectName': this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('wptest.xml'),
      this.destinationPath('sh/wptest.xml')
    );
    this.fs.copy(
      this.templatePath('.htaccess'),
      this.destinationPath('db/.htaccess')
    );
    this.fs.copy(
      this.templatePath('.htaccess'),
      this.destinationPath('sh/.htaccess')
    );
    this.fs.copyTpl(
      this.templatePath('setup.sh'),
      this.destinationPath('sh/setup.sh'),
      {
        'dbName': this.props.wpdb,
        'dbHost': this.props.wpdbHost,
        'siteUrl': this.props.siteUrl,
        'projectName': this.props.name,
        'authorEmail': this.props.authorEmail,
        'authorName': this.props.authorName,
        'adminUser': this.props.adminUser,
        'adminPass': this.props.adminPass,
        'testData': this.props.testData,
        'childTheme': this.props.childTheme,
        'repoUrl': this.props.repoUrl,
        'subrepoUploads': this.props.subrepoUploads
      }
    );
    this.fs.copyTpl(
      this.templatePath('config.sh'),
      this.destinationPath('sh/config.sh'),
      {
        'dbName': this.props.wpdb,
        'dbHost': this.props.wpdbHost,
        'siteUrl': this.props.siteUrl,
        'projectName': this.props.name,
        'authorEmail': this.props.authorEmail,
        'authorName': this.props.authorName,
        'adminUser': this.props.adminUser,
        'adminPass': this.props.adminPass,
        'testData': this.props.testData,
        'childTheme': this.props.childTheme,
        'repoUrl': this.props.repoUrl,
        'subrepoUploads': this.props.subrepoUploads,
        'hostDeployName': this.props.hostDeployName,
        'hostDeployPath': this.props.hostDeployPath,
        'hostDeployUser': this.props.hostDeployUser
      }
    );
    this.fs.copy(
      this.templatePath('deploy.sh'),
      this.destinationPath('sh/deploy.sh')
    );
    this.fs.copyTpl(
      this.templatePath('setup-remote.sh'),
      this.destinationPath('sh/setup-remote.sh'),
      {
        'dbName': this.props.wpdb,
        'dbHost': this.props.wpdbHost,
        'siteUrl': this.props.siteUrl,
        'projectName': this.props.name,
        'authorEmail': this.props.authorEmail,
        'authorName': this.props.authorName,
        'adminUser': this.props.adminUser,
        'adminPass': this.props.adminPass,
        'testData': this.props.testData
      }
    );

    this.fs.copyTpl(
      this.templatePath('reset.sh'),
      this.destinationPath('sh/reset.sh'),
      {
        'dbName': this.props.wpdb,
        'dbHost': this.props.wpdbHost,
        'siteUrl': this.props.siteUrl,
        'projectName': this.props.name,
        'authorEmail': this.props.authorEmail,
        'authorName': this.props.authorName,
        'adminUser': this.props.adminUser,
        'adminPass': this.props.adminPass,
        'testData': this.props.testData
      }
    );
    this.fs.copyTpl(
      this.templatePath('env.json'),
      this.destinationPath('gulp-tasks/env.json'),
      {
        'dbName': this.props.wpdb,
        'dbHost': this.props.wpdbHost,
        'siteUrl': this.props.siteUrl,
        'projectName': this.props.name,
        'authorEmail': this.props.authorEmail,
        'authorName': this.props.authorName
      }
    );
    this.fs.copyTpl(
      this.templatePath('package.sh'),
      this.destinationPath('sh/package.sh'),{
        'projectName': this.props.name,
        'testData': this.props.testData,
        'childTheme': this.props.childTheme,
        'themerepo': this.props.themerepo,
        'authorName': this.props.authorName
      }
    );
    this.fs.copy(
      this.templatePath('sidebar-export.php'),
      this.destinationPath('sh/sidebar-export.php')
    );

    this.fs.copy(
      this.templatePath('deploy.php'),
      this.destinationPath('deploy/deploy.php')
    );

    this.fs.copyTpl(
      this.templatePath('rename.js'),
      this.destinationPath('gulp-tasks/rename.js'),
      {
        'themerepo': this.props.themerepo
      }
    );

    this.fs.copy(
      this.templatePath('_icons.scss'),
      this.destinationPath('sh/_icons.scss')
    );
    this.fs.copy(
      this.templatePath('_icons-variables.scss'),
      this.destinationPath('sh/_icons-variables.scss')
    );
    this.fs.copy(
      this.templatePath('icon-preview.html'),
      this.destinationPath('sh/icon-preview.html')
    );

  },

  install: function () {
    this.installDependencies({
      callback: function () {
        this.spawnCommand('gulp', ['wpSetup']);
      }.bind(this)
    });
  }

});
