// HELPER FUNCTIONS MODULE

// IMPORTS
import { async } from 'regenerator-runtime';
import { TIMOUT_SEC } from './config.js';

///////////////////////////////////////////////////

// What is the goal of this file??
//--- It will contain all those functions that we have to use over and over again in our project
//--- In this module, we then have a central place for all of them basically

///////////////////////////////////////////////

// setTimout function
//--- this function will return a new Promise, which will reject after a certain number of seconds

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
/////////////////////////////////////////////
/*
// Function 1: getJSON()
//--- this function will fetch data, get json and do some error handling and we can just call this function over and over again
//--- this is similar to the function we created in aync JS.
// NOTE
//--- Error propogation
//--- we dont want to catch the error here, but we want to catch it inside that function where getJSON will be called.
//--- that's why we are rethrowing the error (propogating the error) so that it flows downwards and get caught in model.js file

// How to make this function more realistic??
//--- we can do that by adding a timeout. Basically setting a timeout after which the fetch request will fail
//--- this is very important so that due to some reason, the fetch dont keep on running infinitely

// Implementing timout
//--- now, there will be a race between the timeout function and fetch method.
//--- whatever occurs first will win the race
//--- so, we will be using Promise.race([Promise1, Promise2])
//--- .race() will take in an array of 2 promises. whichever resolves first will occur

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

////////////////////////////////////////////////

// Function 2 : sendJSON()
//--- opposite of getJSON. It is to send data to the API
//--- In order to get Data, we pass URL into the fetch function and thats it.
//--- But, sending data is a POST request
//--- So, in the fetch function, along with the URL, we have to pass in an object of options

export const sendJSON = async function (url, uploadData) {
  try {
    // 1. Creating the fetch Request
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    // 2. Race between timeout and fetch function
    const res = await Promise.race([fetchPro, timeout(TIMOUT_SEC)]);
    // 3. Awaiting data coming back (Forkify API returns the data that we send)
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
//////////////////////////////////////////////////////

// Function : AJAX
//--- instead of having separate getJSON and sendJSON functions, we can refactor them and make it 1 function
//--- it will recieve both url and uploadData. uploadData is by default undefined, so when geting data, it will be undefined and therefore not used in the function

export const AJAX = async function (url, uploadData = undefined) {
  try {
    // 1. Creating the fetch request
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    // 2. Race between timeout and fetch function
    const res = await Promise.race([fetchPro, timeout(TIMOUT_SEC)]);
    // 3. Awaiting data coming back (Forkify API returns the data that we send)
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
