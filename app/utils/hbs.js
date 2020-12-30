const moment = require('moment');

module.exports = {
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      var new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
      return new_str + '...';
    }
    return str;
  },
  formatDate: function (date, format) {
    const iso = date.toISOString();
    return moment(iso).format(format);
  },
  checkActive: function(linkText, page) {
    let activeStr;

    if(page === linkText) {
      activeStr = ' active';
    } else {
      activeStr = '';
    }

    console.log('active:', activeStr)

    return activeStr;

  },
  checkCurrent: function(linkText, page) {
    // const currentSpan = document.createElement('span');
    // currentSpan.setAttribute('class', 'sr-only');
    // currentSpan.textContent = '(current)';

    if(page === linkText) {
      return currentSpan;
    } else {
      return;
    }

  },  
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  select: function (selected, options) {
    return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
  }
}