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
/**符文有礼 */
var ChildFuWenYL = (function (_super) {
    __extends(ChildFuWenYL, _super);
    function ChildFuWenYL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildFuWenYL.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        this.list.numItems = GGlobal.modelEightLock.getFWYLDatas().length;
    };
    ChildFuWenYL.prototype.getView = function () {
        return fairygui.UIPackage.createObject("eightLock", "ChildFuWenYL");
    };
    ChildFuWenYL.prototype.onListRender = function (index, render) {
        var datas = GGlobal.modelEightLock.getFWYLDatas();
        render.setData(datas[index]);
    };
    ChildFuWenYL.prototype.onTick = function () {
        var act = ModelEightLock.originalDatas[UIConst.FUWENYOULI];
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
    ChildFuWenYL.prototype.onUpdate = function () {
        var act = ModelEightLock.originalDatas[UIConst.FUWENYOULI];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
            Timer.instance.listen(this.onTick, this, 1000);
        }
        else {
            this.txtRemainTm.text = "00:00:00";
        }
        var datas = GGlobal.modelEightLock.getFWYLDatas();
        this.list.numItems = datas.length;
    };
    ChildFuWenYL.prototype.onShow = function () {
        this.onUpdate();
        IconUtil.setImg(this.bg, "resource/image/pic/bg4.jpg");
    };
    ChildFuWenYL.prototype.onHide = function () {
        IconUtil.setImg(this.bg, null);
        Timer.instance.remove(this.onTick, this);
        this.list.numItems = 0;
    };
    return ChildFuWenYL;
}(ABActUI));
__reflect(ChildFuWenYL.prototype, "ChildFuWenYL");
