$(function(){
	var sql = "select+A%2CB%2Ccount%28C%29+group+by+B%2CA+order+by+count%28C%29+desc"; // SQL 語法
	var gid = 0;
	var callback = "callback"; // 回呼函數名稱
	
	$.getScript("https://spreadsheets.google.com/tq?tqx=responseHandler:" + callback + "&tq=" + sql + "&key=" + sheetID + "&gid=" + gid);
	
	window[callback] = function(json) {
		var rowArray = json.table.rows,
		rowLength = rowArray.length,
		html = '<table style="text-align: center; width: 90%; margin-right: auto; margin-left: auto; font-size: 14px;" border="1" cellpadding="2" cellspacing="2"><tbody><tr style="background-color: silver;"><td style="vertical-align: top;">ISBN</td><td style="vertical-align: top;">書名</td><td style="vertical-align: top;">借出次數</td></tr>',
		i, j, dataGroup, dataLength;
		for (i = 0; i < rowLength; i++) {
			dataGroup = rowArray[i].c;
			dataLength = dataGroup.length;
			html += '<tr>';
			html += '<td style="vertical-align: top;">' + dataGroup[0].v + '</td>';
			html += '<td style="vertical-align: top;">' + dataGroup[1].v + '</td>';
			html += '<td style="vertical-align: top;">' + dataGroup[2].v + '</td>';
			html += "</tr>";
		}
		html += '</tbody></table>';
	$("#book_name").html(html);
	}
});
