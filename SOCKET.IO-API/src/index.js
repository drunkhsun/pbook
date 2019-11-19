var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const bluebird = require("bluebird"); //青鳥
const mysql = require("mysql");
// 設定資料庫連線
const db = mysql.createConnection({
  host: "192.168.27.186",
  user: "root",
  password: "root",
  database: "pbook"
});
db.connect(); //資料庫連線
bluebird.promisifyAll(db);

app.get("/", function (req, res) {
  res.send("socket首頁");
});

var users = [];
io.sockets.on("connection", function (socket) {
  console.log("有一個客戶端連接上了伺服器");
  users.push(socket.id);
  console.log("open---總共幾位會員連接上socket", users.length);

  socket.on("clientToSeverMsg", async function (data) {
    console.log("服務器端收到客戶端資料", data);

    await db.queryAsync(
      `UPDATE mb_chat SET myRead = 1 WHERE chat_id = "${data.chat_id}" AND myTo = "${data.myFrom}"`
    );

    await db.queryAsync(
      `INSERT INTO mb_chat(chat_id, myFrom, myTo, content, myRead, created_at) VALUES ("${data.chat_id}","${data.myFrom}","${data.myTo}","${data.content}","${data.myRead}","${data.created_at}")`
    );

    const results = await db.queryAsync(
      `SELECT mb_chat.*,MR_number,MR_name,MR_pic FROM mb_chat LEFT JOIN mr_information ON MR_number = myTo OR MR_number = myFrom WHERE myFrom = "${data.myFrom}" OR myTo = "${data.myFrom}" ORDER BY created_at ASC`
    );
    // 一開始拿的資料,MR_number有塞我的跟對方的,為了讓MR_number是塞對方的資料,所以要先篩選一次
    var Without_MY_MR_number = [];
    results.forEach(function (value, index) {
      if (value.MR_number !== data.myFrom) {
        Without_MY_MR_number.push(value);
      }
    });

    // 去除重複的chat_id(因為同樣的兩位只需開一個對話框)
    var myResult = {};
    var finalResult = [];
    for (var i = 0; i < Without_MY_MR_number.length; i++) {
      myResult[Without_MY_MR_number[i].chat_id] = Without_MY_MR_number[i];
      //Without_MY_MR_number[i].chat_id不能重复,達到去重效果,這裡必須知道"chat_id"或是其他键名
    }

    var item = [];
    //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
    for (item in myResult) {
      finalResult.push(myResult[item]);
    }

    mapResult = finalResult;
    console.log("mapResult", mapResult);

    const results2 = await db.queryAsync(
      `SELECT * FROM mb_chat WHERE myTo = "${data.myFrom}" AND myRead = 0`
    );

    mapResult.forEach(function (value, index) {
      value.total = 0;
      for (var i = 0; i < results2.length; i++) {
        if (value.MR_number === results2[i].myFrom) {
          value.total++;
        }
      }
    });

    mapResult = mapResult.sort(function (a, b) {
      return a.created_at < b.created_at;
    })

    io.sockets.emit("SeverToClientMsg", { data: data, oldDataList: mapResult });    
  });
  
  socket.on('disconnect', function () {
    socket.disconnect()
    users.pop(socket.id);
    console.log("close---總共幾位會員連接上socket", users.length);
  })

});

http.listen(5000, function () {
  console.log("listening on *:5000");
});
