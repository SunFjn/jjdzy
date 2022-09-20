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
var Child_SkillTest = (function (_super) {
    __extends(Child_SkillTest, _super);
    function Child_SkillTest() {
        return _super.call(this) || this;
    }
    Child_SkillTest.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "Child_SkillTest"));
    };
    Child_SkillTest.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.skillIdLb = (this.getChild("skillIdLb"));
        this.skillActLb = (this.getChild("skillActLb"));
        this.copyBt = (this.getChild("copyBt"));
        this.replaceBt = (this.getChild("replaceBt"));
        this.replaceBt.addClickListener(this.replaceHandle, this);
        this.copyBt.addClickListener(this.copyHandle, this);
    };
    Child_SkillTest.prototype.copyHandle = function () {
        var input = document.createElement("input");
        input.value = this.skillActLb.text;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
    };
    Child_SkillTest.prototype.replaceHandle = function () {
        var skillId = parseInt(this.skillIdLb.text);
        var vo;
        for (var i = 0; i < Model_player.voMine.skillList.length; i++) {
            if (skillId == Model_player.voMine.skillList[i].id) {
                vo = Model_player.voMine.skillList[i];
                break;
            }
        }
        if (vo) {
            vo.cfg.a = JSON.parse(this.skillActLb.text);
        }
        else {
            ViewCommonWarn.text("该角色没有这个技能");
        }
    };
    Child_SkillTest.URL = "ui://vm9a8xq8qla28";
    return Child_SkillTest;
}(fairygui.GComponent));
__reflect(Child_SkillTest.prototype, "Child_SkillTest");
