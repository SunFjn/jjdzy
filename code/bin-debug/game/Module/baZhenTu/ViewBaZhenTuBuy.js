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
var ViewBaZhenTuBuy = (function (_super) {
    __extends(ViewBaZhenTuBuy, _super);
    function ViewBaZhenTuBuy() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 11;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewBaZhenTuBuy.prototype.childrenCreated = function () {
        GGlobal.createPack("bossTiShi");
        this.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.surebt = (this.view.getChild("surebt"));
        this.continuebt = (this.view.getChild("continuebt"));
        this.lab = (this.view.getChild("lab"));
        this.img = (this.view.getChild("img"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.list.defaultItem = VBaZTGridFenJ.URL;
        this.surebt.addClickListener(this.OnSure, this);
        this.continuebt.addClickListener(this.OnContinue, this);
        this.isShowOpenAnimation = false;
        this.closeButton = this.view.getChild("closeButton");
        _super.prototype.childrenCreated.call(this);
    };
    ViewBaZhenTuBuy.prototype.onOpen = function (arg) {
        this.rewardArr = arg.drop;
        this.type = arg.type;
        _super.prototype.onOpen.call(this, arg);
    };
    ViewBaZhenTuBuy.prototype.upOpen = function (arg) {
        this.rewardArr = arg.drop;
        this.type = arg.type;
        this.onShown();
    };
    ViewBaZhenTuBuy.prototype.onShown = function () {
        var s = this;
        s.list.numItems = s.rewardArr.length;
        s.showEff();
        s.times = 11;
        Timer.instance.listen(s.timeHandler, s, 1000);
        if (s.rewardArr.length > 1) {
            s.continuebt.text = "再来10次";
            if (s.type == 0) {
                if (Model_player.voMine.tongbi >= Model_BaZhenTu.tong10) {
                    s.lab.color = Color.GREENINT;
                }
                else {
                    s.lab.color = Color.REDINT;
                }
                s.lab.text = ConfigHelp.numToStr(Model_BaZhenTu.tong10);
                s.img.url = CommonManager.getMoneyUrl(Enum_Attr.TONGBI);
            }
            else {
                var JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
                if (JDCct > 9) {
                    s.lab.color = Color.GREENINT;
                    s.lab.text = JDCct + "/10";
                    var itemCfg = Config.daoju_204[Model_BaZhenTu.JDCid];
                    ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemCfg.icon + ".png", s.img);
                }
                else {
                    if (Model_player.voMine.yuanbao >= Model_BaZhenTu.yuan10) {
                        s.lab.color = Color.GREENINT;
                    }
                    else {
                        s.lab.color = Color.REDINT;
                    }
                    s.lab.text = "" + Model_BaZhenTu.yuan10;
                    s.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao); //元宝
                }
            }
        }
        else {
            s.continuebt.text = "再来1次";
            if (s.type == 0) {
                if (Model_player.voMine.tongbi >= Model_BaZhenTu.tong1) {
                    s.lab.color = Color.GREENINT;
                }
                else {
                    s.lab.color = Color.REDINT;
                }
                s.lab.text = ConfigHelp.numToStr(Model_BaZhenTu.tong1);
                s.img.url = CommonManager.getMoneyUrl(Enum_Attr.TONGBI);
            }
            else {
                var JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
                if (JDCct > 0) {
                    s.lab.color = Color.GREENINT;
                    s.lab.text = JDCct + "/1";
                    var itemCfg = Config.daoju_204[Model_BaZhenTu.JDCid];
                    ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemCfg.icon + ".png", s.img);
                }
                else {
                    if (Model_player.voMine.yuanbao >= Model_BaZhenTu.yuan1) {
                        s.lab.color = Color.GREENINT;
                    }
                    else {
                        s.lab.color = Color.REDINT;
                    }
                    s.lab.text = "" + Model_BaZhenTu.yuan1;
                    s.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao); //元宝
                }
            }
        }
    };
    ViewBaZhenTuBuy.prototype.onHide = function () {
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.BAZHENTU_BUY);
    };
    ViewBaZhenTuBuy.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewBaZhenTuBuy.prototype.OnContinue = function () {
        if (this.rewardArr.length > 1) {
            this.onBuy10();
        }
        else {
            this.onBuy1();
        }
        // this.doHideAnimation();
    };
    ViewBaZhenTuBuy.prototype.onBuy1 = function () {
        if (this.type == 0) {
            Model_BaZhenTu.onTong(1);
        }
        else {
            Model_BaZhenTu.onYuan(1);
        }
    };
    ViewBaZhenTuBuy.prototype.onBuy10 = function () {
        if (this.type == 0) {
            Model_BaZhenTu.onTong(10);
        }
        else {
            Model_BaZhenTu.onYuan(10);
        }
    };
    ViewBaZhenTuBuy.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this.rewardArr[index];
        grid.grid.isShowEff = true;
        grid.vo = v;
    };
    ViewBaZhenTuBuy.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    // private _timeOut;
    // private upReFlash1(): void {
    // 	//动画
    // 	this.showEff();
    // 	var self = this;
    // 	this._timeOut = setTimeout(function () {
    // 		self.showEffEnd();
    // 	}, 600);
    // }
    // private showEffEnd(): void {}
    ViewBaZhenTuBuy.prototype.showEff = function () {
        for (var i = 0; i < this.list.numItems; i++) {
            var gridRender = this.list.getChildAt(i);
            if (gridRender.vo) {
                var grid = gridRender.grid;
                EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
            }
        }
    };
    return ViewBaZhenTuBuy;
}(UIModalPanel));
__reflect(ViewBaZhenTuBuy.prototype, "ViewBaZhenTuBuy");
