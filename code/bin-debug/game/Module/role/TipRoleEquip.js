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
var TipRoleEquip = (function (_super) {
    __extends(TipRoleEquip, _super);
    function TipRoleEquip() {
        var _this = _super.call(this) || this;
        _this.stone = [];
        _this.childrenCreated();
        return _this;
    }
    TipRoleEquip.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TipRoleEquip"));
    };
    TipRoleEquip.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "TipRoleEquip").asCom;
        this.contentPane = this.view;
        var s = this;
        s.grid = (s.view.getChild("grid"));
        s.frame = (s.view.getChild("frame"));
        s.lbLevel = (s.view.getChild("lbLevel"));
        s.lbName = (s.view.getChild("lbName"));
        s.lbPower = (s.view.getChild("lbPower"));
        s.lb = (s.view.getChild("lb"));
        s.lbBaseAtt = (s.view.getChild("lbBaseAtt"));
        s.lbStreng = (s.view.getChild("lbStreng"));
        s.lbStrengPower = (s.view.getChild("lbStrengPower"));
        s.s3 = (s.view.getChild("s3"));
        s.s3.setScale(0.3, 0.3);
        s.s1 = (s.view.getChild("s1"));
        s.s1.setScale(0.3, 0.3);
        s.s0 = (s.view.getChild("s0"));
        s.s0.setScale(0.3, 0.3);
        s.s2 = (s.view.getChild("s2"));
        s.s2.setScale(0.3, 0.3);
        s.lbStone1 = (s.view.getChild("lbStone1"));
        s.lbStone0 = (s.view.getChild("lbStone0"));
        s.lbStone2 = (s.view.getChild("lbStone2"));
        s.lbStone3 = (s.view.getChild("lbStone3"));
        s.lbSX0 = (s.view.getChild("lbSX0"));
        s.lbSX1 = (s.view.getChild("lbSX1"));
        s.lbSX2 = (s.view.getChild("lbSX2"));
        s.lbSX3 = (s.view.getChild("lbSX3"));
        s.grid.tipEnabled = false;
        s.stone = [[s.s0, s.lbStone0, s.lbSX0], [s.s1, s.lbStone1, s.lbSX1], [s.s2, s.lbStone2, s.lbSX2], [s.s3, s.lbStone3, s.lbSX3]];
        _super.prototype.childrenCreated.call(this);
    };
    TipRoleEquip.prototype.onShown = function () {
        this.show(this._args);
    };
    TipRoleEquip.prototype.onHide = function () {
        this.clear();
        GGlobal.layerMgr.close(UIConst.TIP_ROLE_EQUIP);
    };
    TipRoleEquip.prototype.show = function (obj) {
        if (!obj)
            return;
        var s = this;
        var vo = obj;
        s.grid.vo = vo;
        s.grid.showEff(true);
        s.grid.lbNum.text = "";
        s.lbName.text = vo.name;
        s.lbName.color = vo.qColor;
        s.lbLevel.text = vo.condition;
        s.lbPower.text = "战力：" + vo.getPower();
        var starLv = vo.starLv;
        //基础
        var arr = JSON.parse(vo.cfg.attr);
        var ratio = Config.dzstar_209[starLv].addition;
        var str = "";
        for (var i_1 = 0; i_1 < arr.length; i_1++) {
            var attrType = Number(arr[i_1][0]);
            var attrValue = Number(arr[i_1][1]);
            var name = "";
            if (Config.jssx_002[attrType]) {
                name = Config.jssx_002[attrType].name;
                str += name + "  +" + attrValue + "<font color='#15f234'>（升星+" + ((attrValue * ratio / 100000) >> 0) + "）</font>";
            }
            if (i_1 != arr.length - 1) {
                str += "\n";
            }
        }
        s.lbBaseAtt.text = str;
        //强化
        s.lbStrengPower.text = "（+" + vo.qh + "）"; //强化等级
        var cfg = Config.dzqianghua_209[vo.qh];
        arr = JSON.parse(cfg["attr" + vo.type]);
        s.lbStreng.text = ConfigHelp.makeAttrTextArr(arr); //属性
        //宝石
        var bs = vo.bs;
        var one = [422101, 422201, 422301, 422401];
        for (var i = 0; i < bs.length; i++) {
            var level = bs[i];
            var ico = s.stone[i][0];
            var icoName = s.stone[i][1];
            var icoATT = s.stone[i][2];
            var gemcfg = Config.dzgem_209[level];
            if (level == 0) {
                var item = Config.daoju_204[one[i]];
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + item.icon + ".png", s["s" + i]);
                icoName.text = "未镶嵌";
                icoATT.visible = false;
            }
            else {
                var item = Config.daoju_204[level];
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + item.icon + ".png", s["s" + i]);
                icoATT.visible = true;
                icoName.text = ConfigHelp.getItemColorName(level);
                icoATT.text = ConfigHelp.makeAttrTextArr(JSON.parse(gemcfg.attr), "   "); //属性
            }
        }
        // var starStr: string = "";//星级
        // for (var i = 0; i < 10; i++) {
        // 	var num = Math.floor(starLv / 10);
        // 	var num1 = starLv % 10;
        // 	if (i < num1) starStr += (num + 1);
        // 	else starStr += num;
        // }
        s.lb.text = ConfigHelp.getStarFontStr(vo.starLv); // starStr;//星星
    };
    TipRoleEquip.prototype.clear = function () {
        this.grid.showEff(false);
        if (this.parent)
            this.parent.removeChild(this);
    };
    TipRoleEquip.URL = "ui://jvxpx9emqcyl6d";
    return TipRoleEquip;
}(UIModalPanel));
__reflect(TipRoleEquip.prototype, "TipRoleEquip");
