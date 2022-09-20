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
/**符文鉴定 */
var ChildFuWenJD = (function (_super) {
    __extends(ChildFuWenJD, _super);
    function ChildFuWenJD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildFuWenJD.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        var datas = GGlobal.modelEightLock.getFWJDDatas();
        this.list.numItems = datas.length;
    };
    ChildFuWenJD.prototype.getView = function () {
        return fairygui.UIPackage.createObject("eightLock", "ChildFuWenJD");
    };
    ChildFuWenJD.prototype.onListRender = function (index, render) {
        var datas = GGlobal.modelEightLock.getFWJDDatas();
        render.setData(datas[index]);
    };
    ChildFuWenJD.prototype.onUpdate = function () {
        var act = ModelEightLock.originalDatas[UIConst.FUWENJIANDING];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
            Timer.instance.listen(this.onTick, this, 1000);
        }
        else {
            this.txtRemainTm.text = "00:00:00";
        }
        this.txtJDInfo.text = ModelEightLock.hasJianDing + "件";
        var datas = GGlobal.modelEightLock.getFWJDDatas();
        datas.sort(this.onSort);
        this.list.numItems = datas.length;
    };
    ChildFuWenJD.prototype.onSort = function (a, b) {
        var state1 = GGlobal.modelEightLock.getFWDJState(a);
        var state2 = GGlobal.modelEightLock.getFWDJState(b);
        if (!state1)
            state1 = 0;
        if (!state2)
            state2 = 0;
        if (state1 == state2) {
            return a.id - b.id;
        }
        else {
            if (state1 == 1) {
                return -1;
            }
            else if (state2 == 1) {
                return 1;
            }
            else {
                return state1 - state2;
            }
        }
    };
    ChildFuWenJD.prototype.onTick = function () {
        var act = ModelEightLock.originalDatas[UIConst.FUWENJIANDING];
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
    ChildFuWenJD.prototype.onShow = function () {
        if (this.list.numChildren)
            this.list.scrollToView(0);
        IconUtil.setImg(this.bg, "resource/image/pic/bg3.png");
        GGlobal.modelEightLock.CG4571(UIConst.FUWENJIANDING);
        GGlobal.modelEightLock.listen(ModelEightLock.msg_fwJD, this.onUpdate, this);
    };
    ChildFuWenJD.prototype.onHide = function () {
        Timer.instance.remove(this.onTick, this);
        IconUtil.setImg(this.bg, null);
        this.list.numItems = 0;
        GGlobal.modelEightLock.remove(ModelEightLock.msg_fwJD, this.onUpdate, this);
    };
    return ChildFuWenJD;
}(ABActUI));
__reflect(ChildFuWenJD.prototype, "ChildFuWenJD");
