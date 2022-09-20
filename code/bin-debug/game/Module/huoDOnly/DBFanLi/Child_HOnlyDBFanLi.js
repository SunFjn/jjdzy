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
var Child_HOnlyDBFanLi = (function (_super) {
    __extends(Child_HOnlyDBFanLi, _super);
    function Child_HOnlyDBFanLi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Child_HOnlyDBFanLi, "instance", {
        get: function () {
            if (Child_HOnlyDBFanLi._instance == null) {
                Child_HOnlyDBFanLi._instance = (fairygui.UIPackage.createObject("huoDOnly", "Child_HOnlyDBFanLi"));
            }
            return Child_HOnlyDBFanLi._instance;
        },
        enumerable: true,
        configurable: true
    });
    Child_HOnlyDBFanLi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.setVirtual();
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.itemRender;
    };
    Child_HOnlyDBFanLi.prototype.itemRender = function (index, item) {
        item.setData(this.datas[index], this._act);
    };
    Child_HOnlyDBFanLi.prototype.show = function (p, act) {
        var s = this;
        this._act = act;
        p.addChild(s);
        s.setXY(0, 275);
        GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_DBFANLI, s.setList, s);
        GGlobal.modelHuoDOnly.CG_OPEN_UI(act.id);
        // IconUtil.setImg(s.bg, "resource/image/sanGuoQD/" + UIConst.DANBIFANLI + ".jpg");
        IconUtil.setImg(s.bg, Enum_Path.PIC_URL + "zs" + Config.zshd_315[this._act.index].bg + ".jpg");
        s.updateX();
        s.setList();
        Timer.instance.listen(this.updateX, this, 1000);
        s.labTips.text = Config.zshdb_315[act.id].nr;
    };
    Child_HOnlyDBFanLi.prototype.disposePanel = function () {
        var s = this;
        if (s.parent) {
            s.parent.removeChild(s);
        }
        GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_DBFANLI, s.setList, s);
        Timer.instance.remove(s.updateX, s);
        s.datas = [];
        s.list.numItems = 0;
        IconUtil.setImg(s.bg, null);
    };
    Child_HOnlyDBFanLi.prototype.setList = function () {
        this.datas = this.getListDataDaiOne(Model_HuoDOnly.getDBFanLi(this._act.id), Config.zshddbfl_315);
        this.list.numItems = this.datas.length;
    };
    Child_HOnlyDBFanLi.prototype.updateX = function () {
        if (this._act) {
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            if (d < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
            }
        }
        else {
            this.labTime.text = "剩余时间：";
        }
    };
    //单笔充值
    Child_HOnlyDBFanLi.prototype.getListDataDaiOne = function (arr, cfg) {
        var len = arr ? arr.length : 0;
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        for (var i = 0; i < len; i++) {
            var v = arr[i];
            // let max = cfg[v.id].cs
            // let $status = arr ? arr[i].getStaCt(max) : 0
            if (v.canCt > 0) {
                arr1.push(arr[i]);
            }
            else if (v.canCt == 0 && v.hasCt == 0) {
                arr3.push(arr[i]);
            }
            else {
                arr2.push(arr[i]);
            }
        }
        arr1.sort(function (a, b) { return a.id - b.id; });
        arr2.sort(function (a, b) { return a.id - b.id; });
        arr3.sort(function (a, b) { return a.id - b.id; });
        return arr1.concat(arr2).concat(arr3);
    };
    Child_HOnlyDBFanLi.URL = "ui://mk3gp0vrhndy8";
    return Child_HOnlyDBFanLi;
}(fairygui.GComponent));
__reflect(Child_HOnlyDBFanLi.prototype, "Child_HOnlyDBFanLi");
