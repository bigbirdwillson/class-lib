$(function () {
  // 輸入 ISBN
  $("#isbn").change(function () {
    var isbn = $("#isbn").val();
    if (isbn != "") {
      var currentdate = new Date();
      var filltime =
        currentdate.getFullYear() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getDate() +
        "  " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      var data = {
        isbn: isbn,
        ret_date: filltime,
        sheetTag: "借閱紀錄",
        kind: 1,
      };
      $.ajax({
        type: "post",
        url: Google_API,
        data: data,
        dataType: "JSON",
        success: function (response) {
          if (response.result === "ok") {
            $("#book_name").html(
              "已成功歸還：《" +
                response.data.book +
                "》 ，借閱人：" +
                response.data.user
            );
          } else {
            $("#book_name").html(response.msg);
          }
          $("#isbn").val("").focus();
        },
      });
    }
  });
});
