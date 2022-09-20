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
var Child_UpdateNotice = (function (_super) {
    __extends(Child_UpdateNotice, _super);
    function Child_UpdateNotice() {
        return _super.call(this) || this;
    }
    Child_UpdateNotice.createInstance = function () {
        return (fairygui.UIPackage.createObject("Welfare", "Child_UpdateNotice"));
    };
    Child_UpdateNotice.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        // this.list = <fairygui.GList><any>(this.getChild("list"));
        // this.backImg = <fairygui.GLoader><any>(this.getChild("backImg"));
        var s = this;
        CommonManager.parseChildren(s, s);
        this.list1.itemRenderer = this.renderHandle;
        this.list1.callbackThisObj = this;
        this.list1.setVirtual();
        GGlobal.modelwelfare.CG_GET_WELFARENOTICE();
        this.c1.selectedIndex = 0;
    };
    Child_UpdateNotice.prototype.show = function () {
        var self = this;
        GGlobal.control.listen(Enum_MsgType.WELFARE_NOTICE_UPDATE, self.show, self);
        // let item = this.list._children[0] as NoticeItem;
        // item.show();
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "gonggao.jpg");
        self.btnGonggao.addClickListener(self.onGonggao, self);
        self.btnGongneng.addClickListener(self.onGongneng, self);
        self._listData = self.getGongnengList();
        self.onGonggao();
        if (!self._listData || self._listData.length <= 0) {
            self.btnGongneng.visible = false;
        }
        else {
            self.btnGongneng.visible = true;
        }
    };
    Child_UpdateNotice.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.backImg, null);
        GGlobal.control.remove(Enum_MsgType.WELFARE_NOTICE_UPDATE, self.show, self);
        self.btnGonggao.removeClickListener(self.onGonggao, self);
        self.btnGongneng.removeClickListener(self.onGongneng, self);
        self.list.numItems = 0;
    };
    /**
     * 更新公告
     */
    Child_UpdateNotice.prototype.onGonggao = function () {
        this.c1.selectedIndex = 0;
        var item = this.list._children[0];
        item.show();
    };
    /**
     * 功能预告
     */
    Child_UpdateNotice.prototype.onGongneng = function () {
        var self = this;
        self.c1.selectedIndex = 1;
        self.list1.numItems = self._listData.length;
    };
    Child_UpdateNotice.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.show(this._listData[index]);
    };
    Child_UpdateNotice.prototype.getGongnengList = function () {
        var self = this;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var arr = [];
        for (var key in Config.gnyg_336) {
            var vo = Config.gnyg_336[key];
            var beginTime = self.transformTime(vo.hstart);
            var endTime = self.transformTime(vo.hend);
            if (servTime >= beginTime && servTime <= endTime) {
                arr.push(vo);
            }
        }
        return arr;
    };
    /**
     * 字符串准换成时间戳（秒）
     */
    Child_UpdateNotice.prototype.transformTime = function (str) {
        return Date.parse(str) / 1000;
    };
    Child_UpdateNotice.URL = "ui://ye1luhg3ffubg";
    return Child_UpdateNotice;
}(fairygui.GComponent));
__reflect(Child_UpdateNotice.prototype, "Child_UpdateNotice");
