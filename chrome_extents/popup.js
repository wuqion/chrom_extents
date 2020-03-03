// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let storage_pb;
//"pb";
chrome.storage.sync.get(["pb"], function (result) {
  storage_pb = result["pb"];
  if(!storage_pb){
    storage_pb = {};
    storage_pb['url'] = {};
    storage_pb['id'] = {};
    storage_pb['class'] = {};
  }

})
chrome.storage.sync.get(["pb"], function(result) {
  if(result["pb"]&&result["pb"]){
    ceshi.innerHTML = JSON.stringify(result["pb"])

  }});
let button = document.getElementById('submit');
button.onclick = function () {

  let pb_url = document.getElementById("pb_url").value;
  let pb_id = document.getElementById("pb_id").value;
  let pb_class = document.getElementById("pb_class").value;

  pb_url != '' ? storage_pb['url'][pb_url + ''] = pb_url : '';
  pb_id != '' ? storage_pb['id'][pb_id] = pb_id : '';
  pb_class != '' ? storage_pb['class'][pb_class] = pb_class : '';

  ceshi.innerHTML = JSON.stringify(storage_pb) + '-ss'

  chrome.storage.sync.set({ "pb": storage_pb }, function () {
    console.log('color is ' + JSON.stringify(storage_pb));
    ;
  })
  var bg = chrome.extension.getBackgroundPage();//获取background页面
  bg.pburl = Object.keys(storage_pb['url']);
  bg.pbid = Object.keys(storage_pb['id']);
  bg.pbclass = Object.keys(storage_pb['class']);
}
let clear = document.getElementById('clear');
clear.onclick= function () {

  storage_pb = {};
  storage_pb['url'] = {};
  storage_pb['id'] = {};
  storage_pb['class'] = {};
  chrome.storage.sync.set({ "pb": storage_pb }, function () {
    console.log('color is ' + JSON.stringify(storage_pb));
    ceshi.innerHTML = JSON.stringify(storage_pb)
    ;
  })
  var bg = chrome.extension.getBackgroundPage();//获取background页面
  bg.pburl = [];
  bg.id = [];
}

