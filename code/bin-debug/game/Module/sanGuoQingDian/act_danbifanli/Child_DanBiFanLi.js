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
/**单笔返利 */
var Child_DanBiFanLi = (function (_super) {
    __extends(Child_DanBiFanLi, _super);
    function Child_DanBiFanLi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child_DanBiFanLi.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "Child_DanBiFanLi"));
    };
    Child_DanBiFanLi.setExtends = function () {
    };
    Child_DanBiFanLi.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_DanBiFanLi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        this.list.setVirtual();
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.itemRender;
    };
    Child_DanBiFanLi.prototype.itemRender = function (index, item) {
        item.setData(this.datas[index]);
    };
    Child_DanBiFanLi.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self.list.numItems = 0;
        GGlobal.control.listen(Enum_MsgType.DANBIFANLI, self.setList, self);
        GGlobal.control.listen(Enum_MsgType.DANBIFANLIREWARD, self.refreshList, self);
        GGlobal.modelActivity.CG_OPENACT(UIConst.DANBIFANLI);
        IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.DANBIFANLI + ".jpg");
        self.startTime();
    };
    // {result : result, id : id, count : count, lastNum : lastNum}
    Child_DanBiFanLi.prototype.refreshList = function (arg) {
        for (var i = 0; i < this.datas.length; ++i) {
            if (arg.id == this.datas[i].id) {
                this.datas[i].count = arg.count;
                this.datas[i].lastNum = arg.lastNum;
                break;
            }
        }
        for (var i = 0; i < this.datas.length; ++i) {
            var state = this.datas[i].count > 0;
            GGlobal.reddot.setCondition(UIConst.DANBIFANLI, 0, state);
            if (state) {
                break;
            }
        }
        this.datas.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
        this.list.numItems = this.datas.length;
        GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
    };
    Child_DanBiFanLi.prototype.setList = function (arg) {
        //console.log("dddddddddddddddddd", arg.data);
        this.datas = arg.data;
        this.datas.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
        this.list.numItems = this.datas.length;
    };
    Child_DanBiFanLi.prototype.closePanel = function () {
        var self = this;
        Timer.instance.remove(self.timeHandler, self);
        GGlobal.control.remove(Enum_MsgType.DANBIFANLI, self.setList, self);
        GGlobal.control.remove(Enum_MsgType.DANBIFANLIREWARD, self.refreshList, self);
        self.datas = [];
        self.list.numItems = 0;
        IconUtil.setImg(self.bg, null);
    };
    Child_DanBiFanLi.prototype.startTime = function () {
        var self = this;
        var vo = self.vo;
        self.times = vo.getSurTime();
        self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        if (self.times > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_DanBiFanLi.prototype.timeHandler = function () {
        var s = this;
        s.times--;
        s.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    };
    Child_DanBiFanLi.pkg = "sanGuoQingDian";
    Child_DanBiFanLi.URL = "ui://kdt501v2mq0c1c";
    return Child_DanBiFanLi;
}(fairygui.GComponent));
__reflect(Child_DanBiFanLi.prototype, "Child_DanBiFanLi", ["IPanel"]);
