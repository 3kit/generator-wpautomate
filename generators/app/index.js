'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');



function makeGeneratorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('generator-') === 0 ? name : '' + name;
  return name;
}
module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the kickass ' + chalk.red('generator-wpautomate') + ' generator!'
    ));

    var prompts = [{
      name: 'name',
      message: 'Your project name',
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
      name: 'wpdbUser',
      message: 'DB user name?',
      default: 'root'
    },
    {
      name: 'wpdbPass',
      message: 'DB Password?',
      default: ''
    },
    {
      name: 'wpdbHost',
      message: 'DB Host name?',
      default: 'localhost'
    },
    {
      name: 'wpdbChar',
      message: 'DB CHAR?',
      default: 'utf8mb4'
    },
    {
      name: 'authorName',
      message: 'Your Name?',
      default: 'Yeoman'
    },
    {
      name: 'authorEmail',
      message: 'Your Email?',
      default: '',
      validate: function(str) {
        return str.length > 0;
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  envTemplate: function() {
    
    this.fs.copyTpl(
      this.templatePath('env.json'),
      this.destinationPath('gulp-tasks/env.json'),
      {
        'dbName': this.props.wpdb,
        'wpdbUser': this.props.wpdbUser,
        'wpdbPass': this.props.wpdbPass,
        'wpdbHost': this.props.wpdbHost,
        'wpdbChar': this.props.wpdbChar,
        'authorName': this.props.authorName,
        'authorEmail': this.props.authorEmail
      }
    );
  },

  writing: function () {
   
    // root files
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json '),
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
    this.fs.copy(
      this.templatePath('config.json'),
      this.destinationPath('gulp-tasks/config.json')
    );
    this.fs.copy(
      this.templatePath('deploy.js'),
      this.destinationPath('gulp-tasks/deploy.js')
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
      this.templatePath('post-merge.txt'),
      this.destinationPath('gulp-tasks/post-merge.txt')
    );
    this.fs.copy(
      this.templatePath('pot.js'),
      this.destinationPath('gulp-tasks/pot.js')
    );
    this.fs.copy(
      this.templatePath('pre-commit.txt'),
      this.destinationPath('gulp-tasks/pre-commit.txt')
    );
    this.fs.copy(
      this.templatePath('script.js'),
      this.destinationPath('gulp-tasks/script.js')
    );
    this.fs.copy(
      this.templatePath('serve.js'),
      this.destinationPath('gulp-tasks/serve.js')
    );
    this.fs.copy(
      this.templatePath('setup.js'),
      this.destinationPath('gulp-tasks/setup.js')
    );
    this.fs.copy(
      this.templatePath('styles.js'),
      this.destinationPath('gulp-tasks/styles.js')
    );
    this.fs.copy(
      this.templatePath('wp-config.tpl'),
      this.destinationPath('gulp-tasks/wp-config.tpl')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
