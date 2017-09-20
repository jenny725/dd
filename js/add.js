function jq(res) {
    var obj = {};
    var reg = /([^&?=#]+)=([^&?=#]+)/g;
    res.replace(reg, function () {
        obj[arguments[1]] = arguments[2]

    });
    return obj
}


var $userName = $("#userName"),
$userAge = $("#userAge"),
$userPhone = $("#userPhone"),
$userAddress = $('#userAddress');
var surId = "";
var oul = window.location.href;
console.log(oul);
surId = jq(oul)["id"];
console.log(surId);
if (!!surId) {
    $.ajax({
        url: 'http://192.168.1.108:88/getInfo?id=' + surId,
        cache: false,
        success: function (res) {
            if (res && res["code"] === 0) {
                var data = res['data'];
                $userName.val(data.name);
                $userAge.val(data.age);
                $userPhone.val(data.phone);
                $userAddress.val(data.address);
            }
        }

    })

    $("#submit").click(function (e) {
        e = e || window.event;
        var obj={
            "name":$userName.val(),
            "age":$userAge.val(),
            "phone":$userPhone.val(),
            "address":$userAddress.val()
        };
        //"name";data.val()
        if(!!surId){
            obj["id"]=surId;
            $.ajax({
                url:'http://192.168.1.108:88/updateInfo',
                cache:false,
                type:"POST",
                data:JSON.stringify(obj),
                success:function(res){
                    if(res&&res['code']===0){
                        window.location.href="index.html"
                    }
                }
            })
        }else{
            $.ajax({
                url:'http://192.168.1.108:88/addInfo',
                cache:false,
                type:"POST",
                data:JSON.stringify(obj),
                success:function(res){
                    if(res&&res['code']===0){
                        window.location.href="index.html"
                    }
                }

            })
        }
    });


}
