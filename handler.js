'use strict';
const lighthouse = require('lighthouse');
const CDP = require('chrome-remote-interface');

const opts = {}

module.exports.crawl = async (event, context, callback) => {
  const client = await CDP();
  const {
    Network,
    Page
  } = client;
  await Promise.all([Network.enable(), Page.enable()]);
  lighthouse('https://encyclopedia.ushmm.org').then(results => {
    callback(results.report);
  })
};