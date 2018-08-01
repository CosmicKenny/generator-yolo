'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the amazing ${chalk.green('generator-yolo')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Enter author name',
        default: this.appname // Default to current folder name
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        authorName: this.props.authorName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );
    this.fs.copyTpl(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), {
      name: this.props.name
    });
  }

  install() {
    // This.installDependencies();
    this.log(
      `All necessary files are created and we will run ${chalk.yellow(
        '"npm install"'
      )} for you!`
    );
    this.npmInstall();
    this.log(
      `All done, You can run ${chalk.yellow('"npm run dev"')} to start the dev server.`
    );
  }
};
