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
var ViewPeacockGetReward = (function (_super) {
    __extends(ViewPeacockGetReward, _super);
    function ViewPeacockGetReward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewPeacockGetReward.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("FuBen", "ViewPeacockGetReward").asCom;
        this.contentPane = this.view;
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.list = (this.view.getChild("list"));
        this.btnGet = (this.view.getChild("btnGet"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewPeacockGetReward.prototype.onShown = function () {
        this.btnGet.addClickListener(this.getHandle, this);
        GGlobal.control.listen(Enum_MsgType.PEACOCK_PASSLAYER_NUM, this.upReward, this);
    };
    ViewPeacockGetReward.prototype.onHide = function () {
        this.btnGet.removeClickListener(this.getHandle, this);
        GGlobal.control.remove(Enum_MsgType.PEACOCK_PASSLAYER_NUM, this.upReward, this);
        GGlobal.layerMgr.close(UIConst.PEACOCK_REWARD);
        this.list.numItems = 0;
    };
    ViewPeacockGetReward.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.updateView(arg);
    };
    ViewPeacockGetReward.prototype.updateView = function (cur) {
        if (cur == 0) {
            this.lbTitle.text = "铜雀台挑战奖励已全部领取";
            this.lbTitle.color = Color.GREENINT;
            this.btnGet.visible = false;
            this.list.numItems = 0;
            return;
        }
        this.btnGet.visible = true;
        this._curLayer = cur;
        this.lbTitle.text = "铜雀台挑战达到" + this._curLayer + "层，可领取";
        if (Model_Peacock.curLayer >= this._curLayer) {
            this.lbTitle.color = Color.GREENINT;
            this.btnGet.checkNotice = true;
        }
        else {
            this.lbTitle.color = Color.REDINT;
            this.btnGet.checkNotice = false;
        }
        var tower = Config.tower_219[this._curLayer];
        if (tower)
            this._dropReward = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(tower.reward1));
        else
            this._dropReward = [];
        this.list.numItems = this._dropReward.length;
        this.btnGet.enabled = Model_Peacock.curLayer >= this._curLayer;
    };
    ViewPeacockGetReward.prototype.getHandle = function (event) {
        if (event === void 0) { event = null; }
        if (Model_Peacock.curLayer >= this._curLayer) {
            GGlobal.modelPeacock.CG_GETREWARD(this._curLayer);
        }
        else {
            ViewCommonWarn.text("尚未达到领取条件");
        }
    };
    ViewPeacockGetReward.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._dropReward[index];
        item.tipEnabled = true;
    };
    ViewPeacockGetReward.prototype.upReward = function () {
        var layer = Model_Peacock.getRewardLayer();
        this.updateView(layer);
    };
    return ViewPeacockGetReward;
}(UIModalPanel));
__reflect(ViewPeacockGetReward.prototype, "ViewPeacockGetReward");
