// const remote = require('electron').remote;
import {remote} from 'electron';

const currentWin = remote.getCurrentWindow();
const closeBTN = document.getElementById('close-btn');
const minimizeBTN = document.getElementById('min-btn');

closeBTN.addEventListener('click', ()=>{
    currentWin.close();
});

minimizeBTN.addEventListener('click', ()=>{
    currentWin.minimize();
});
