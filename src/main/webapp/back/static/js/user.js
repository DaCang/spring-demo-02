var pageNum=2;
$(function() {
   // getPageCount();
    layui.use(['element', 'layer','laypage', 'form'], function(){
        var element = layui.element()
            ,jq = layui.jquery
            ,form = layui.form()
            ,laypage = layui.laypage;


        /*
        * 分页
        * */
        laypage({
            cont: 'page'
            ,skip: true
            ,pages: pageNum //总页数
            ,groups: 5 //连续显示分页数
            ,curr: 1
            ,jump: function(e, first){ //触发分页后的回调
                //alert(e.curr);


                /* if(!first){ //一定要加此判断，否则初始时会无限刷新

                     location.href = '/userAction.do?method=page&page='+e.curr;
                 }else{*/

                //location.href = ls_url;
                /*$.getJSON( url,
                    function (data){
                        setData(data)
                    }

                 );*/

                loading = layer.load(2, {
                    shade: [0.2,'#000'] //0.2透明度的白色背景
                });
                jq.get('/user/list.con?page='+ e.curr,
                    function(data){
                        if(data==null||data=="") {
                            layer.close(loading);
                            layer.msg("服务器错误,请联系管理员", {icon: 2, anim: 6, time: 1000});
                            return false;
                        }
                        //var result = eval("("+data+")");
                         //alert(result);
                        layer.close(loading);
                        setData(data,e.curr)


                    });
            }
        });
        //图片预览
        jq('.list-table td .thumb').hover(function(){
            jq(this).append('<img class="thumb-show" src="'+jq(this).attr('thumb')+'" >');
        },function(){
            jq(this).find('img').remove();
        });
        //链接预览
        jq('.list-table td .link').hover(function(){
            var link = jq(this).attr('href');
            layer.tips( link, this, {
                tips: [2, '#009688'],
                time: false
            });
        },function(){
            layer.closeAll('tips');
        });

        //监听提交
        form.on('submit(sort)', function(data){
            loading = layer.load(2, {
                shade: [0.2,'#000'] //0.2透明度的白色背景
            });
            var param = data.field;
            jq.post('',param,function(data){
                if(data.code == 200){
                    layer.close(loading);
                    layer.msg(data.msg, {icon: 1, time: 1000}, function(){
                        location.reload();//do something
                    });
                }else{
                    layer.close(loading);
                    layer.msg(data.msg, {icon: 2, anim: 6, time: 1000});
                }
            });
            return false;
        });


        // layer.msg('玩命加载中...',{icon: 1, time: 1000000});

        jq('.del_btn').click(function(){

            var user_name = jq(this).attr('user-name');
            var user_id = jq(this).attr('user-id');
            layer.confirm('确定删除【'+user_name+'】?', function(index){
                loading = layer.load(2, {
                    shade: [0.2,'#000'] //0.2透明度的白色背景
                });
                jq.post('/userAction.do?method=delete',{'user_id':user_id},function(data){
                    if(data==null||data=="") {
                        layer.close(loading);
                        layer.msg("服务器错误,请联系管理员", {icon: 2, anim: 6, time: 1000});
                        return false;
                    }
                    var result = eval("(" + data + ")");
                    if(result.code == 200){
                        layer.close(loading);
                        layer.msg(result.msg, {icon: 1, time: 1000}, function(){
                            location.reload();//do something
                        });
                    }else{
                        layer.close(loading);
                        layer.msg(result.msg, {icon: 2, anim: 6, time: 1000});
                    }
                });
            });

        });

    })
    //loadUserInfo();
});
/*
*
*[
    {
        "deptId":"",
        "passWord":"123",
        "roleId":"system",
        "status":"0",
        "userId":"admin",
        "userName":"系统管理员"
    },
    {
        "deptId":"001",
        "passWord":"syl",
        "roleId":"001",
        "status":"0",
        "userId":"syl",
        "userName":"宋永利"
    }
]*/

function del(obj) {

    //alert(111);
    layui.use(['layer'], function () {
        var jq = layui.jquery


        var user_name = jq(obj).attr('user-name');
        var user_id = jq(obj).attr('user-id');

        layer.confirm('确定删除【' + user_name + '】?', function (index) {
            loading = layer.load(2, {
                shade: [0.2, '#000'] //0.2透明度的白色背景
            });
            jq.post('/user/del.con', {userId: user_id}, function (data) {
                if (data == null || data == "") {
                    layer.close(loading);
                    layer.msg("服务器错误,请联系管理员", {icon: 2, anim: 6, time: 1000});
                    return false;
                }
                var result = eval("(" + data + ")");
                if (result.code == 200) {
                    layer.close(loading);
                    layer.msg(result.msg, {icon: 1, time: 1000}, function () {
                        location.reload();//do something
                    });
                } else {
                    layer.close(loading);
                    layer.msg(result.msg, {icon: 2, anim: 6, time: 1000});
                }
            });
        });


        //loadUserInfo();
    })
}

function getRoleName(roleId){
    if(roleId == 'system'){
        return '系统管理员'
    }else{
        return '普通用户'
    }
}

function getPageCount() {
    //alert(111);
    layui.use(['layer'], function () {
        var jq = layui.jquery



        jq.post('/user/pageCount.con',
            function (data) {
                if (data == null || data == "") {

                    layer.msg("服务器错误,请联系管理员", {icon: 2, anim: 6, time: 1000});
                    return false;
                }
                pageNum=data.pageNum
            });
    });
}

