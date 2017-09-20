function aa() {
    $.ajax({
        url: "http://192.168.1.108:88/getAllList",
        cache: false,
        success: function (res) {
            if (res && res["code"] === 0) {
                var str = "";
                var data = res["data"];
                $(data).each(function (index, item) {
                    //console.log(item)
                    str += '<li>' + '<span class="small">' + item['id'] + '</span>' +
                        '<span>' + item['name'] + '</span>' +
                        '<span class="small">' + item['age'] + '</span>' +
                        '<span>' + item['phone'] + '</span>' +
                        '<span>' + item['address'] + '</span>' +
                        '<span class="control">' +
                        '<a href="add.html?id=' + item['id'] + '">修改</a>' +
                        '<a href="javaScript:;" data-id="' + item['id'] + '">删除</a>' +
                        '</span>' + '</li>'
                });
                $("#list").html(str)
            }
        }
    })
}
function bb() {
    $("#box").click(function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        var $id = $(target).attr('data-id');
        console.log($id);
        if (target.tagName.toUpperCase() === "A" && target.innerHTML === "删除") {
            $.ajax({
                url: 'http://192.168.1.108:88/removeInfo?id=' + $id,
                cache: false,
                success: function (res) {
                    if(res&&res["code"]===0){
                        $(target).parent().parent().remove()
                    }
                }
            })
        }
    })
}
aa();
bb();





