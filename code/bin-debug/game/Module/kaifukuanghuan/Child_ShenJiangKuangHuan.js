var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Child_ShenJiangKuangHuan = (function (_super) {
    __extends(Child_ShenJiangKuangHuan, _super);
    function Child_ShenJiangKuangHuan() {
        return _super.call(this) || this;
    }
    Child_ShenJiangKuangHuan.createInstance = function () {
        return (fairygui.UIPackage.createObject("kaifukuanghuan", "Child_ShenJiangKuangHuan"));
    };
    Child_ShenJiangKuangHuan.prototype.clean = function () {
        if (this.list.numItems != 0) {
            this.list.numItems = 0;
        }
    };
    Child_ShenJiangKuangHuan.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.list = (this.getChild("list"));
        this.list.itemRenderer = this.itemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    Child_ShenJiangKuangHuan.prototype.updateData = function (data) {
        ////console.log("GGlobal.model_KaiFKH.SJKHData.length", data.length)
        //	//console.log("Model_WuJiang.wuJiangArr", Model_WuJiang.wuJiangArr);
        this.vo = data;
        this.vo.sort(function (a, b) { return a.getSortIndex2() < b.getSortIndex2() ? -1 : 1; });
        this.list.numItems = data.length; //GGlobal.model_KaiFKH.SJKHData.length;
    };
    Child_ShenJiangKuangHuan.prototype.itemRender = function (index, item) {
        var data = this.vo[index];
        item.setData(data);
    };
    Child_ShenJiangKuangHuan.URL = "ui://yk4rwc6rl4a99";
    return Child_ShenJiangKuangHuan;
}(fairygui.GComponent));
__reflect(Child_ShenJiangKuangHuan.prototype, "Child_ShenJiangKuangHuan");
