$(function () {
  // 輸入人員代碼
  $("#stud_id").change(function () {
    var stud_id = $("#stud_id").val();
    if (stud_id != "") {
      var data = {
        member_id: stud_id,
        sheetTag: "人員資料庫",
        kind: 2,
      };
      $.ajax({
        type: "post",
        url: Google_API,
        data: data,
        dataType: "JSON",
        success: function (response) {
          if (response.result === "error") {
            $("#member").html(response.msg);
          } else {
            var name = response.data.name;
            $("#member").html(
              '<p>人員姓名：<input id="Name" name="name" value="' +
                name +
                '" readonly="readonly"></p>請輸入ISBN:<input maxlength="13" size="13" name="isbn" id="isbn" onchange="ShowStr(this.id)">（下一位借書請輸入：33）'
            );
            $("#isbn").focus();
          }
        },
      });
    }
  });
});

// 輸入 ISBN
function ShowStr(x) {
  var isbn = $("#isbn").val();
  if (isbn == "33") {
    $("#member").html("");
    $("#book_name").html("");
    $("#miss_book").html("");
    $("#stud_id").val("");
    $("#stud_id").focus();
    return;
  }

  var member_id = $("#stud_id").val();
  var name = $("#Name").val();
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

  if (member_id && name && isbn) {
    var data = {
      member_id: member_id,
      isbn: isbn,
      name: name,
      bro_date: filltime,
      sheetTag: "書籍資料庫",
      kind: 3,
    };
    $.ajax({
      type: "post",
      url: Google_API,
      data: data,
      dataType: "JSON",
      success: function (response) {
        if (response.result === "error") {
          $("#miss_book").html(response.msg);
        } else {
          $("#miss_book").html("");
          var bro_book_str = $("#book_name").html();
          if (bro_book_str == "") {
            $("#book_name").html(
              '<div style="border-style: solid; width: 200px; margin-right: auto; margin-left: auto; background-color: rgb(204, 255, 255);">借出書名</div>'
            );
            bro_book_str = $("#book_name").html();
          }
          bro_book_str +=
            '<div style="border-style: solid; width: 200px; margin-right: auto; margin-left: auto;">' +
            response.data.book +
            "</div>";
          $("#book_name").html(bro_book_str);
        }
        $("#isbn").val("").focus();
      },
    });
  }
}
