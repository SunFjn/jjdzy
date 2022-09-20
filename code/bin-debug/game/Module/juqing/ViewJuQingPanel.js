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
var ViewJuQingPanel = (function (_super) {
    __extends(ViewJuQingPanel, _super);
    function ViewJuQingPanel() {
        var _this = _super.call(this) || this;
        _this._time = 2;
        _this._clickEnable = false;
        // this.isShowOpenAnimation = false;
        _this.isShowMask = false;
        _this.loadRes("juQing", "juQing_atlas0");
        return _this;
        // this.setSkin("juQing", "juQing_atlas0", "ViewJuQingPanel");
    }
    ViewJuQingPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("juQing", "ViewJuQingPanel"));
    };
    ViewJuQingPanel.prototype.childrenCreated = function () {
        GGlobal.createPack("juQing");
        this.view = fairygui.UIPackage.createObject("juQing", "ViewJuQingPanel").asCom;
        this.contentPane = this.view;
        this.lbDesc = (this.view.getChild("lbDesc"));
        this.lbName = (this.view.getChild("lbName"));
        this.viewHead = (this.view.getChild("viewHead"));
        this.lbTime = (this.view.getChild("lbTime"));
        this.isShowOpenAnimation = false;
        this.isClosePanel = false;
        _super.prototype.childrenCreated.call(this);
    };
    ViewJuQingPanel.prototype.onShown = function () {
        this.setXY(-this.width, 250);
        egret.Tween.get(this).to({ x: 41 }, 400, egret.Ease.backInOut).call(this.begain, this);
        var type = this._args[0];
        var gua = this._args[1];
        this._juQArr = ViewJuQingPanel.getJuQCfg(type, gua);
        this._time = 3;
        this._index = 0;
        this.visible = true;
        this._clickEnable = false;
        this.upTimer();
        this.next();
    };
    ViewJuQingPanel.prototype.begain = function () {
        var s = this;
        Timer.instance.listen(s.upTimer, s, 1000);
        GGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onClick, s);
    };
    ViewJuQingPanel.prototype.end = function () {
        var s = this;
        Timer.instance.remove(s.upTimer, s);
        GGlobal.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onClick, s);
    };
    ViewJuQingPanel.prototype.onHide = function () {
        var s = this;
        IconUtil.setImg(s.viewHead, null);
        GGlobal.layerMgr.close(UIConst.XIN_SHOU_JU_QING);
        ViewJuQingPanel.status = 1;
        s.end();
    };
    Object.defineProperty(ViewJuQingPanel, "maxGua", {
        get: function () {
            if (ViewJuQingPanel._maxGua == 0) {
                ViewJuQingPanel.initData();
            }
            return ViewJuQingPanel._maxGua;
        },
        enumerable: true,
        configurable: true
    });
    ViewJuQingPanel.getJuQCfg = function ($lei, $gua) {
        ViewJuQingPanel.initData();
        return ViewJuQingPanel._juQCfg[$lei][$gua];
    };
    ViewJuQingPanel.initData = function () {
        if (ViewJuQingPanel._juQCfg == null) {
            ViewJuQingPanel._juQCfg = {};
            for (var keys in Config.xsjq_014) {
                var v = Config.xsjq_014[keys];
                var t = JSON.parse(v.type); //ConfigHelp.SplitStr(v.type)
                var lei = Number(t[0][0]);
                var gua = Number(t[0][1]);
                if (ViewJuQingPanel._juQCfg[lei] == null) {
                    ViewJuQingPanel._juQCfg[lei] = {};
                }
                var wordArr = JSON.parse(v.word); //ConfigHelp.SplitStr(v.word)
                var arr = [];
                for (var i = 0; i < wordArr.length; i++) {
                    var npc = Number(wordArr[i][0]);
                    var word = wordArr[i][1];
                    arr[i] = { npc: npc, word: word };
                }
                ViewJuQingPanel._juQCfg[lei][gua] = arr;
                if (lei == 1 && gua > ViewJuQingPanel._maxGua) {
                    ViewJuQingPanel._maxGua = gua;
                }
            }
        }
    };
    ViewJuQingPanel.prototype.upTimer = function () {
        this._time--;
        if (this._time <= 0) {
            this.visible = false;
            this.lbTime.text = "";
            this.chageStatus();
        }
        else {
            this.lbTime.text = "" + this._time;
        }
    };
    ViewJuQingPanel.prototype.chageStatus = function () {
        var s = this;
        s.end();
        setTimeout(function () {
            s._time = 3;
            s._clickEnable = false;
            s.next();
        }, 1000);
        if (this._index < this._juQArr.length) {
            if (ViewJuQingPanel.status == 3 || ViewJuQingPanel.status == 4) {
                ViewJuQingPanel.status = ViewJuQingPanel.status == 4 ? 3 : 4;
            }
            GGlobal.control.notify(Enum_MsgType.MSG_JUQING_STATUS, true);
        }
    };
    ViewJuQingPanel.prototype.next = function () {
        var v = this._juQArr[this._index];
        if (v) {
            this.setXY(-this.width, 250);
            egret.Tween.get(this).to({ x: 41 }, 400, egret.Ease.backInOut).call(this.begain, this);
            this.visible = true;
            if (v.npc == 0) {
                this.lbName.text = Model_player.voMine.name;
                var headPic = Config.shezhi_707[Model_Setting.headId];
                IconUtil.setImg(this.viewHead, RoleUtil.getHeadJuQ(headPic.picture + ""));
                if (ViewJuQingPanel.status == 0)
                    ViewJuQingPanel.status = 3;
            }
            else {
                var npc = Config.NPC_200[v.npc];
                this.lbName.text = npc.name;
                IconUtil.setImg(this.viewHead, RoleUtil.getHeadJuQ(npc.head + ""));
                if (ViewJuQingPanel.status == 0)
                    ViewJuQingPanel.status = 4;
            }
            this.lbDesc.text = v.word;
        }
        else {
            this.visible = false;
            this.lbTime.text = "";
            this.closeEventHandler(null);
        }
        this._index++;
    };
    ViewJuQingPanel.prototype.onClick = function () {
        if (this._clickEnable) {
            return;
        }
        this._clickEnable = true;
        this._time = 1;
        this.upTimer();
    };
    ViewJuQingPanel.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, 250);
        // if (this.modalLayer) this.modalLayer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.setModalMask();
    };
    ViewJuQingPanel.URL = "ui://vm8a565ak0t23fn";
    ViewJuQingPanel.status = 0; //0初始   1剧情完   2剧情中  3人物剧情  4boss剧情
    ViewJuQingPanel._maxGua = 0;
    return ViewJuQingPanel;
}(UIModalPanel));
__reflect(ViewJuQingPanel.prototype, "ViewJuQingPanel");
