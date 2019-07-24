#!/usr/bin/env node
const inquirer = require('inquirer');
const express = require('express');
const proxy = require('http-proxy-middleware');
const program = require('commander');

var app = express();

program
  .option('-g, --glitchurl <type>', 'Glitch URL')
  .option('-u, --user <type>', 'User')
  .option('-p, --password <type>', 'Password')
  .option('-q, --quiet', 'Quiet mode');

program.parse(process.argv);
inquirer
  .prompt([
    {
      name: 'glitchURL',
      message: 'Enter Glitch URL (Ex: https://xxx.glitch.me) :',
      validate: function (value) {
        var pattern = /^https:\/\/(.*?)\.glitch\.me$/gm;
        result = pattern.test(value) ? true : "Please enter the live app URL";
        return result;
      },
      default: program.glitchurl,
      when: function (answers) {
        if (program.quiet && program.glitchurl)
          return false;
        else
          return true;
      }
    },
    {
      name: 'glitchUser',
      message: 'Enter Glitch .env user (FW_GLITCH_USER) :',
      validate: function (value) {
        return String(value).length > 2 ? true : "Please enter the Glitch user mentioned in .env";
      },
      default: program.user,
      when: function (answers) {
        if (program.quiet && program.user)
          return false;
        else
          return true;
      }
    },
    {
      name: 'glitchPassword',
      message: 'Enter Glitch .env password (FW_GLITCH_PASSWORD) :',
      type: 'password',
      validate: function (value) {
        return String(value).length > 2 ? true : "Please enter the Glitch password mentioned in .env";
      },
      default: program.password,
      when: function (answers) {
        if (program.quiet && program.password)
          return false;
        else
          return true;
      }
    }
  ])
  .then(answers => {
    answers.glitchURL = answers.glitchURL || program.glitchurl;
    answers.glitchUser = answers.glitchUser || program.user;
    answers.glitchPassword = answers.glitchPassword || program.password;
    startProxy(answers);
  });


function startProxy(answers) {
  app.use(
    '**',
    proxy({
      ws: true,
      target: answers.glitchURL,
      changeOrigin: true,
      auth: answers.glitchUser + ':' + answers.glitchPassword
    })
  );
  app.listen(10001);
}