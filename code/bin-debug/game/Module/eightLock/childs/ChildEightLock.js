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
var ChildEightLock = (function (_super) {
    __extends(ChildEightLock, _super);
    function ChildEightLock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildEightLock.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var datas = GGlobal.modelEightLock.getDatas();
        this.list.itemRenderer = function (i, r) { r.setData(datas[i]); };
        this.list.callbackThisObj = this;
        this.list.numItems = datas.length;
    };
    ChildEightLock.prototype.getView = function () {
        return fairygui.UIPackage.createObject("eightLock", "ChildEightLock").asCom;
    };
    ChildEightLock.prototype.onUpdate = function () {
        var datas = GGlobal.modelEightLock.getDatas();
        this.list.numItems = datas.length;
        var act = ModelEightLock.originalDatas[UIConst.EIGHTLOCK];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
            Timer.instance.listen(this.onTick, this, 1000);
        }
        else {
            this.txtRemainTm.text = "00:00:00";
        }
        this.txtCZ.text = "您在本活动已充值" + HtmlUtil.fontNoSize(ModelEightLock.chongZhiValue + "元宝", "#00ff00");
    };
    ChildEightLock.prototype.onTick = function () {
        var act = ModelEightLock.originalDatas[UIConst.EIGHTLOCK];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
        }
        else {
            this.txtRemainTm.text = "00:00:00";
            Timer.instance.remove(this.onTick, this);
        }
    };
    ChildEightLock.prototype.onShow = function () {
        IconUtil.setImg(this.bg, "resource/image/pic/bg1.png");
        GGlobal.modelEightLock.listen(ModelEightLock.msg_datas, this.onUpdate, this);
        GGlobal.modelEightLock.CG4521();
    };
    ChildEightLock.prototype.onHide = function () {
        IconUtil.setImg(this.bg, null);
        Timer.instance.remove(this.onTick, this);
        GGlobal.modelEightLock.remove(ModelEightLock.msg_datas, this.onUpdate, this);
        this.list.numItems = 0;
    };
    return ChildEightLock;
}(ABActUI));
__reflect(ChildEightLock.prototype, "ChildEightLock");
