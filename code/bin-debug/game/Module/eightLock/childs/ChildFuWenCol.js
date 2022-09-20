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
/**符文收集 */
var ChildFuWenCol = (function (_super) {
    __extends(ChildFuWenCol, _super);
    function ChildFuWenCol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildFuWenCol.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        var datas = GGlobal.modelEightLock.getFWColDatas();
        this.list.numItems = datas.length;
    };
    ChildFuWenCol.prototype.getView = function () {
        return fairygui.UIPackage.createObject("eightLock", "ChildFuWenCol");
    };
    ChildFuWenCol.prototype.onListRender = function (index, render) {
        var datas = GGlobal.modelEightLock.getFWColDatas();
        render.setData(datas[index]);
    };
    ChildFuWenCol.prototype.onUpdate = function () {
        var act = ModelEightLock.originalDatas[UIConst.FUWENCOLLECT];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
            Timer.instance.listen(this.onTick, this, 1000);
        }
        else {
            this.txtRemainTm.text = "00:00:00";
        }
        var datas = GGlobal.modelEightLock.getFWColDatas();
        datas.sort(this.onSort);
        this.list.numItems = datas.length;
    };
    ChildFuWenCol.prototype.onSort = function (a, b) {
        var state1 = GGlobal.modelEightLock.fuwenColDic[a.id];
        var state2 = GGlobal.modelEightLock.fuwenColDic[b.id];
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
    ChildFuWenCol.prototype.onTick = function () {
        var act = ModelEightLock.originalDatas[UIConst.FUWENCOLLECT];
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
    ChildFuWenCol.prototype.onShow = function () {
        if (this.list.numChildren)
            this.list.scrollToView(0);
        IconUtil.setImg(this.bg, "resource/image/pic/bg2.png");
        GGlobal.modelEightLock.CG4571(UIConst.FUWENCOLLECT);
        GGlobal.modelEightLock.listen(ModelEightLock.msg_fwCol, this.onUpdate, this);
    };
    ChildFuWenCol.prototype.onHide = function () {
        IconUtil.setImg(this.bg, null);
        Timer.instance.remove(this.onTick, this);
        this.list.numItems = 0;
        GGlobal.modelEightLock.remove(ModelEightLock.msg_fwCol, this.onUpdate, this);
    };
    return ChildFuWenCol;
}(ABActUI));
__reflect(ChildFuWenCol.prototype, "ChildFuWenCol");
