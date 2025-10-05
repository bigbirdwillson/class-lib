// 網路應用程式網址 (完整 exec URL)
var Google_API = "https://script.google.com/macros/s/AKfycbwSjIBT9ISuFMzDWL2XIPkSKuA_JpambGOUjhHFZDGvH9jL9DG7uf7c33BU8z79mTDl/exec";

// 試算表ID
var sheetID = '1Kb6uxSm8i_PnddKflBTo3BA6-uyLJ78Z';

$(function () {
  var nav_arr = [];
  nav_arr[0] = '借書';
  nav_arr[1] = '還書';
  nav_arr[2] = '新增書籍';
  nav_arr[3] = '借閱狀況';
  nav_arr[4] = '書籍狀況';

  var html_arr = [];
  html_arr[0] = 'index.html';
  html_arr[1] = 'retbook.html';
  html_arr[2] = 'addbook.html';
  html_arr[3] = 'brostatus.html';
  html_arr[4] = 'bookstatus.html';

  var hrefname = location.href.split("/");
  var filename = hrefname[hrefname.length - 1];
  var nav_string = '';

  for (var item = 0; item < nav_arr.length; item++) {
    if (html_arr[item] == filename)
      nav_string += '<li><a class="active">' + nav_arr[item] + '</a></li>';
    else
      nav_string += '<li><a href="' + html_arr[item] + '">' + nav_arr[item] + '</a></li>';
  }
  $("#Nav").html(nav_string);

  // 網頁橫幅標題，可改
  $("#Header").html('忠義實驗小學L3班圖書借閱系統 2.1');
});
