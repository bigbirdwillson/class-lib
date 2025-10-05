$(function () {
  // 新增書籍按鈕
  $("#mybutton").click(function (e) {
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
        kind: 4,
      };

      $.ajax({
        type: "post",
        url: Google_API,
        data: data,
        dataType: "JSON",
        success: function (response) {
          console.log("✅ Success Response:", response);
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
          console.error("❌ Response Text:", xhr.responseText);
          $("#err").html(
            "送出失敗：" + error + "<br>" +
            "狀態：" + status + "<br>" +
            "伺服器回應：" + xhr.responseText
          );
        },
      });
    }
  });

  // 輸入 ISBN 自動查 Google Books
  $("#isbn").change(function () {
    var isbn = $("#isbn").val().trim();
    if (isbn != "") {
      $.get(
        "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn,
        function (data) {
          console.log("📚 Google Books API 回應:", data);
          if (data.totalItems > 0) {
            var info = data.items[0].volumeInfo;
            $("#book_name").val(info.title || "");
            $("#book_author").val(info.authors ? info.authors.join(", ") : "");
            $("#book_maker").val(info.publisher || "");
            $("#book_isbn").val(isbn);
            $("#test").html("書籍資料已自動帶入！");
          } else {
            $("#err").html("查無此書，請手動輸入");
            $("#book_name, #book_author, #book_maker").val("");
          }
        }
      ).fail(function (xhr, status, error) {
        console.error("❌ Google Books API Error:", status, error);
        $("#err").html("無法連線到 Google Books API");
      });
    }
  });
});
