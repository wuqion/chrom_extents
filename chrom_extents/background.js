// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        // pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
var pburl;
var pbid;
var pbclass;
chrome.storage.sync.get(["pb"], function(result) {
  if(result["pb"]&&result["pb"]['url']){
    pburl = Object.keys(result["pb"]['url']);
  }
  if(result["pb"]&&result["pb"]['id']){
    pbid = Object.keys(result["pb"]['id']);
  }
});
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log(details.url);
    if(pburl&&pburl.indexOf(details.url)!=-1){
      return {cancel: true};
    }
    return {cancel: false};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  sendResponse({"pbid":pbid,"pbclass":pbclass});
  })