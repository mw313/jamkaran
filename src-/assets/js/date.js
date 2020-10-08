const jDate = require('jalali-date');
const $ = require('jquery');

let jdate = new jDate();
$('#date').html(jdate.format('dddd DD MMMM YYYY'));