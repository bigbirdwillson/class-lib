$(function () {
  $("#mybutton").click(function () {
    if ($("#book_name").val() == "") {
      alert("請輸入書名");
      $("#book_name").focus();
      return false;
    } else if ($("#book_isbn").val() == "") {
      alert("請輸入ISBN");
      $("#book_isbn").focus();
      return false;
    } else {
      var data = {
        isbn: $("#book_isbn").val(),
        book_name: $("#book_name").val(),
        book_author: $("#book_author").val(),
        book_maker: $("#book_maker").val(),
        sheetTag: "書籍資料庫",
        kind: 4
      };

      $.ajax({
        url: Google_API,
        data: data,
        type: "GET",       // ✅ JSONP 只能 GET
        dataType: "jsonp", // ✅ 告訴 jQuery 這是 JSONP
        success: function (response) {
          console.log("✅ Success:", response);
          if (response.result === "ok") {
            $("#test").html(response.data.book + " -- " + response.msg);
            $("#book_isbn, #book_author, #book_maker, #book_name, #isbn").val("");
            $("#isbn").focus();
          } else {
            $("#err").html(response.msg);
          }
        },
        error: function (xhr, status, error) {
          console.error("❌ Ajax Error:", status, error);
          $("#err").html("送出失敗：" + error);
        }
      });
    }
  });
});
