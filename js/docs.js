var rem;

$(document).ready(function() {

  var $codeSnippets = $('.code-example-body')
  rem = calcRem();

  // Conver to code snippets
  $codeSnippets.each(function() {
    var newContent = escapeHtml($(this).html());
    $(this).html(newContent);
  });

  // Generate Typography Info
  var headingEls = [$('h1'), $('h2'), $('h3'), $('h4'), $('h5'), $('h6')];
  var headingSizesEls = [$('#h1-size'), $('#h2-size'), $('#h3-size'), $('#h4-size'), $('#h5-size'), $('#h6-size')];
  var headingFontInfoEl = $('#heading-font');
  var bodyFontInfoEl = $('#body-font');
  var body = $('body');

  var generateBodyInfo = function() {
    var fontSize = getFontSize(body);
    var fontFamily = getFontFamily(body);
    var fontSize = getFontSize(body);
    var fontWeight = getFontWeight(body);
    var lineHeight = getLineHeight(body, fontSize[0]);

    bodyFontInfoEl.text(fontFamily +
      ' with a weight of ' +  fontWeight + ' set at ' +
      fontSize[1] + 'rem (' + fontSize[0] + 'px) over a ' +
      lineHeight[1] + ' line height (' + lineHeight[0] + 'px)');
  };

  var generateHeadingInfo = function() {
    var fontFamily = getFontFamily(headingEls[0]);
    var fontWeight = getFontWeight(headingEls[0]);

    headingFontInfoEl.text(fontFamily +
      ' with a weight of ' +  fontWeight);
  };

  var generateHeadingSizes = function() {

    for (var i = headingEls.length - 1; i >= 0; i--) {
      var fontSize = getFontSize(headingEls[i])[1];
      headingSizesEls[i].text(fontSize.toFixed(1) + 'rem');
    };
  };

  generateBodyInfo();
  generateHeadingInfo();
  generateHeadingSizes();

  $(window).on('resize', function(){
    generateBodyInfo();
    generateHeadingInfo();
    generateHeadingSizes();
  });

});


// ----------------
// Utils
// ----------------
var escapeHtml = function(string) {
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  return String(string).replace(/[&<>"'\/]/g, function(s) {
    return entityMap[s];
  });
};

var calcRem = function () {
  var html = document.getElementsByTagName('html')[0];

  return function () {
    return parseInt(window.getComputedStyle(html)['fontSize']);
  }
};

var getFontSize = function(el) {
  var fontSizePx = Math.round(el.css('font-size').replace('px',''));
  var fontSize = fontSizePx / rem();

  return [fontSizePx, fontSize];
};

var getFontFamily = function(el) {
  return (el.css('font-family').split(','))[0].replace(/\'/g, '').replace(/\"/g, '');
};

var getFontWeight = function(el) {
  return el.css('font-weight');
};

var getLineHeight = function(el, fontSizePx) {
  var lineHeightPx = Math.round(el.css('line-height').replace('px',''));
  var lineHeight = lineHeightPx / fontSizePx;

  return [lineHeightPx, lineHeight];
};