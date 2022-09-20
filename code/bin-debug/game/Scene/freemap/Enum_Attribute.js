var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Enum_Attribute = (function () {
    function Enum_Attribute() {
    }
    /**
     * 场景状态  0：正常，1：战斗，2：冻结
     */
    Enum_Attribute.STATE = "1";
    /**
     * x
     */
    Enum_Attribute.GLOBAL_X = "2";
    /**
     * y
     */
    Enum_Attribute.GLOBAL_Y = "3";
    /**
     * 方向dir
     */
    Enum_Attribute.PLAYER_DIR = "4";
    /**
     * route路径坐标集合
     */
    Enum_Attribute.ROUTE = "5";
    /**
     * id
     */
    Enum_Attribute.ID = "6";
    /**
     * 名字
     */
    Enum_Attribute.PLAYER_NAME = "7";
    /**
     * 等级
     */
    Enum_Attribute.LEVEL = "8";
    /**
     * 经验
     */
    Enum_Attribute.ZS = "9";
    /**
     * 铜币
     */
    Enum_Attribute.TONGBI = "10";
    /**
     * 元宝
     */
    Enum_Attribute.YUANBAO = "11";
    /**
     * 职业时装
     */
    Enum_Attribute.PLAYER_BODY = "12";
    /**
     * 武器模型
     */
    Enum_Attribute.PLAYER_WEAPON = "13";
    /**
     * vip等级
     */
    Enum_Attribute.VIP = "14";
    /**
     * npc系统id
     */
    Enum_Attribute.SYSTEM_ID = "15";
    /**
     * xxx的类型：例npc
     */
    Enum_Attribute.TYPE = "16";
    Enum_Attribute.SPEED = "17";
    Enum_Attribute.TITLES = "18";
    /**
     * 当前气血
    */
    Enum_Attribute.CUR_HP = "19";
    /**
     * 最大气血
    */
    Enum_Attribute.MAX_HP = "20";
    /**
     * 兽魂
    */
    Enum_Attribute.SHOUHUN = "21";
    /**
     *阵营
    */
    Enum_Attribute.CAMP = "22";
    /**
     *坐骑
    */
    Enum_Attribute.HORSE = "23";
    return Enum_Attribute;
}());
__reflect(Enum_Attribute.prototype, "Enum_Attribute");
