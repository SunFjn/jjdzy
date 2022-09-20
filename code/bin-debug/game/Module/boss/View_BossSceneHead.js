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
var View_BossSceneHead = (function (_super) {
    __extends(View_BossSceneHead, _super);
    function View_BossSceneHead() {
        var _this = _super.call(this) || this;
        _this.maxLen = 303;
        _this.bloods = [];
        return _this;
    }
    View_BossSceneHead.createInstance = function () {
        if (!View_BossSceneHead._instance)
            View_BossSceneHead._instance = (fairygui.UIPackage.createObject("common", "View_BossSceneHead"));
        return View_BossSceneHead._instance;
    };
    View_BossSceneHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbName = (s.getChild("lbName"));
        s.lbHp = (s.getChild("lbHp"));
        s.head = (s.getChild("head"));
        s.rewardGroup = (s.getChild("rewardGroup"));
        s.passLb = (s.getChild("passLb"));
        s.grid = (s.getChild("grid"));
        s.grid.isShowEff = true;
        s.bloodCom = new fairygui.GComponent();
        s.addChild(s.bloodCom);
        s.bloodCom.setXY(218, 51);
        s.setChildIndex(s.bloodCom, 2);
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, 280);
    };
    View_BossSceneHead.prototype.showBoss = function (id, isCombo, mhp, imgkey, yy, namestr, rewardVo, passStr) {
        if (imgkey === void 0) { imgkey = 0; }
        if (yy === void 0) { yy = 280; }
        if (namestr === void 0) { namestr = null; }
        if (rewardVo === void 0) { rewardVo = null; }
        if (passStr === void 0) { passStr = null; }
        var s = this;
        s.y = yy;
        var npc = Config.NPC_200[id];
        if (!npc) {
            return;
        }
        if (!imgkey) {
            imgkey = npc.head;
        }
        if (namestr) {
            s.lbName.text = namestr;
        }
        else {
            s.lbName.text = npc.name;
        }
        s.head.setdata(RoleUtil.getHeadImg(imgkey + ""), npc.lv, null, null, true);
        if (mhp) {
            s.setMaxHp(mhp);
        }
        else {
            s.setMaxHp(npc.hp);
        }
        if (rewardVo) {
            s.grid.vo = rewardVo;
            s.rewardGroup.visible = true;
            s.passLb.text = passStr;
            s.grid.tipEnabled = true;
        }
        else {
            s.rewardGroup.visible = false;
        }
    };
    View_BossSceneHead.prototype.setMaxHp = function (value) {
        this.maxHp = value;
        this.initBlood();
    };
    View_BossSceneHead.prototype.initBlood = function () {
        this.curHp = this.maxHp;
        this.lbHp.text = ((this.curHp / this.maxHp * 100) >> 0) + "%";
        var max = this.getMaxCount();
        for (var i = 0; i < this.bloods.length; i++) {
            this.bloodCom.removeChild(this.bloods[i]);
        }
        var img;
        for (i = 0; i < max; i++) {
            if (this.bloods.length > i) {
                img = this.bloods[i];
                egret.Tween.removeTweens(img);
            }
            else {
                img = new fairygui.GLoader();
                ImageLoader.instance.loader(Enum_Path.PIC_URL + "BM_BOXT" + (i + 1) + ".png", img);
                img.setSize(this.maxLen, 20);
                this.bloods.push(img);
            }
            img.fill = fairygui.LoaderFillType.ScaleFree;
            img.content.fillMode = egret.BitmapFillMode.CLIP;
            img.setSize(this.maxLen, 20);
            this.bloodCom.addChild(img);
            img.visible = true;
        }
        this.setChildIndex(this.lbHp, this.numChildren - 1);
    };
    View_BossSceneHead.prototype.getMaxCount = function () {
        var maxhp = this.maxHp;
        var count = Math.ceil(maxhp / 1000); //计算几条气血;
        if (count > 5) {
            count = 5;
        }
        else if (count <= 0) {
            count = 1;
        }
        return count;
    };
    View_BossSceneHead.prototype.updateHp = function (arg) {
        var hp = arg;
        if (hp < 0) {
            hp = 0;
        }
        if (this.curHp == hp) {
            return hp;
        }
        this.curHp = hp;
        this.lbHp.text = ((this.curHp / this.maxHp * 100).toFixed(1)) + "%";
        var max = this.getMaxCount();
        var one = this.maxHp / max; //一条气血
        var cur = Math.ceil(hp / one); //剩余的血条
        var len = this.bloods.length;
        this.imgW = [];
        for (var i = 0; i < len; i++) {
            egret.Tween.removeTweens(this.bloods[i]);
            if (i < cur - 1) {
                this.imgW.push(this.maxLen);
            }
            else if (i == cur - 1) {
                if (hp % one == 0) {
                    this.imgW.push(this.maxLen);
                }
                else {
                    this.imgW.push(Math.floor(((hp % one) / one) * this.maxLen));
                }
            }
            else {
                this.imgW.push(0);
            }
        }
        this.tween();
    };
    View_BossSceneHead.prototype.tween = function () {
        var len = this.bloods.length;
        for (var i = len - 1; i >= 0; i--) {
            if (this.bloods[i].width != this.imgW[i]) {
                egret.Tween.get(this.bloods[i]).to({ width: this.imgW[i] }, 300).call(this.tween, this);
                break;
            }
        }
    };
    View_BossSceneHead.prototype.onShown = function () {
        if (!this.parent) {
            GGlobal.layerMgr.UI_floorUI_1.addChild(View_BossSceneHead.createInstance());
        }
        if (this._args) {
            this.showBoss(this._args[0], this._args[1], this._args[2], this._args[3], this._args[4], this._args[5], this._args[6], this._args[7]);
        }
        GGlobal.control.listen(Enum_MsgType.MSG_BOSS_HP_UPDATE, this.updateHp, this);
    };
    View_BossSceneHead.prototype.onHide = function () {
        this.removeFromParent();
        GGlobal.control.remove(Enum_MsgType.MSG_BOSS_HP_UPDATE, this.updateHp, this);
        this.grid.clean();
        this._args = null;
    };
    View_BossSceneHead.hide = function () {
        View_BossSceneHead.createInstance().onHide();
    };
    View_BossSceneHead.show = function (id, isCombo, mhp, headkey, yy, namestr, rewardVo, passStr) {
        if (headkey === void 0) { headkey = 0; }
        if (yy === void 0) { yy = 280; }
        if (namestr === void 0) { namestr = null; }
        if (rewardVo === void 0) { rewardVo = null; }
        if (passStr === void 0) { passStr = null; }
        var view = View_BossSceneHead.createInstance();
        view._args = [id, isCombo, mhp, headkey, yy, namestr, rewardVo, passStr];
        view.onShown();
    };
    View_BossSceneHead.URL = "ui://jvxpx9emkw747m";
    return View_BossSceneHead;
}(fairygui.GComponent));
__reflect(View_BossSceneHead.prototype, "View_BossSceneHead");
