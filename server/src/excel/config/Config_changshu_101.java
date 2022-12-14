package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_changshu_101;
public class Config_changshu_101 extends ConfigBase<Struct_changshu_101> {
    private static Config_changshu_101 ins = null;
    public static Config_changshu_101 getIns(){
        if(ins==null){
            ins = new Config_changshu_101();
        }
        return ins;
    }
    private Config_changshu_101(){
        put(2,new Struct_changshu_101(2,"无敌时间",300000));
        put(3,new Struct_changshu_101(3,"怒气上限",100000));
        put(4,new Struct_changshu_101(4,"受伤怒气",100));
        put(5,new Struct_changshu_101(5,"攻击怒气",1500));
        put(6,new Struct_changshu_101(6,"暴击/抗暴常数",400000000));
        put(7,new Struct_changshu_101(7,"命中/闪避常数",900000000));
        put(8,new Struct_changshu_101(8,"技能秒伤常数",130));
        put(9,new Struct_changshu_101(9,"攻速常数",50));
        put(10,new Struct_changshu_101(10,"战力压制比例",50));
        put(11,new Struct_changshu_101(11,"战力压制值",2000000000));
        put(101,new Struct_changshu_101(101,"战力压制比例(跨服试炼)",100));
        put(111,new Struct_changshu_101(111,"战力压制值(跨服试炼)",2000000000));
        put(12,new Struct_changshu_101(12,"生命战力",25));
        put(13,new Struct_changshu_101(13,"防御战力",500));
        put(14,new Struct_changshu_101(14,"攻击战力",500));
        put(15,new Struct_changshu_101(15,"暴击战力",400));
        put(16,new Struct_changshu_101(16,"抗暴战力",400));
        put(17,new Struct_changshu_101(17,"命中战力",400));
        put(18,new Struct_changshu_101(18,"闪避战力",400));
        put(19,new Struct_changshu_101(19,"真实伤害战力",500));
        put(20,new Struct_changshu_101(20,"暴击率战力",20000));
        put(21,new Struct_changshu_101(21,"抗暴率战力",20000));
        put(22,new Struct_changshu_101(22,"命中率战力",40000));
        put(23,new Struct_changshu_101(23,"闪避率战力",40000));
        put(24,new Struct_changshu_101(24,"爆伤加成战力",10000));
        put(25,new Struct_changshu_101(25,"爆伤减免战力",10000));
        put(26,new Struct_changshu_101(26,"伤害加成战力",40000));
        put(27,new Struct_changshu_101(27,"伤害减免战力",40000));
        put(28,new Struct_changshu_101(28,"火焰伤害战力",500));
        put(29,new Struct_changshu_101(29,"冰冻伤害战力",500));
        put(30,new Struct_changshu_101(30,"毒液伤害战力",500));
        put(31,new Struct_changshu_101(31,"电击伤害战力",500));
        put(32,new Struct_changshu_101(32,"爆炸伤害战力",500));
        put(33,new Struct_changshu_101(33,"火焰抗性战力",500));
        put(34,new Struct_changshu_101(34,"冰冻抗性战力",500));
        put(35,new Struct_changshu_101(35,"剧毒抗性战力",500));
        put(36,new Struct_changshu_101(36,"电击抗性战力",500));
        put(37,new Struct_changshu_101(37,"爆炸抗性战力",500));
        put(3701,new Struct_changshu_101(3701,"额外战力",100));
        put(38,new Struct_changshu_101(38,"怒气技能CD",3000));
        put(39,new Struct_changshu_101(39,"天书技能CD",3000));
        put(40,new Struct_changshu_101(40,"宝物技能CD",3000));
        put(41,new Struct_changshu_101(41,"绿品武将秒伤基础值",0));
        put(43,new Struct_changshu_101(43,"蓝品武将秒伤基础值",170000));
        put(45,new Struct_changshu_101(45,"紫品武将秒伤基础值",180000));
        put(47,new Struct_changshu_101(47,"橙品武将秒伤基础值",190000));
        put(49,new Struct_changshu_101(49,"红品武将秒伤基础值",200000));
        put(51,new Struct_changshu_101(51,"金品武将秒伤基础值",210000));
        put(53,new Struct_changshu_101(53,"彩色品武将秒伤基础值",300000));
        put(42,new Struct_changshu_101(42,"绿品武将秒伤提升值",0));
        put(44,new Struct_changshu_101(44,"蓝品武将秒伤提升值",3500));
        put(46,new Struct_changshu_101(46,"紫品武将秒伤提升值",4000));
        put(48,new Struct_changshu_101(48,"橙品武将秒伤提升值",4500));
        put(50,new Struct_changshu_101(50,"红品武将秒伤提升值",5000));
        put(52,new Struct_changshu_101(52,"金品武将秒伤提升值",5500));
        put(54,new Struct_changshu_101(54,"彩色品武将秒伤提升值",6000));
        put(60,new Struct_changshu_101(60,"绿品少主秒伤基础值",0));
        put(61,new Struct_changshu_101(61,"蓝品少主秒伤基础值",0));
        put(62,new Struct_changshu_101(62,"紫品少主秒伤基础值",2000));
        put(63,new Struct_changshu_101(63,"橙品少主秒伤基础值",3000));
        put(64,new Struct_changshu_101(64,"红品少主秒伤基础值",4000));
        put(70,new Struct_changshu_101(70,"绿品少主秒伤提升值",0));
        put(71,new Struct_changshu_101(71,"蓝品少主秒伤提升值",0));
        put(72,new Struct_changshu_101(72,"紫品少主秒伤提升值",30));
        put(73,new Struct_changshu_101(73,"橙品少主秒伤提升值",50));
        put(74,new Struct_changshu_101(74,"红品少主秒伤提升值",60));
        put(75,new Struct_changshu_101(75,"奇策爆气能量上限",100000));
        put(76,new Struct_changshu_101(76,"奇策爆气能量回复",2000));
        put(77,new Struct_changshu_101(77,"人物基础移动速度",200));
        put(1001,new Struct_changshu_101(1001,"战力压制生效的战力比例1（PVE）",5000));
        put(1002,new Struct_changshu_101(1002,"战力压制生效的战力比例2（PVE）",15000));
        put(1003,new Struct_changshu_101(1003,"战力压制生效的战力比例3（PVE）",30000));
        put(1004,new Struct_changshu_101(1004,"战力压制生效的战力比例4（PVE）",40000));
        put(1005,new Struct_changshu_101(1005,"战力压制生效的战力比例5（PVE）",50000));
        put(1101,new Struct_changshu_101(1101,"战力压制生效的战力最大差值1（PVE）",100000000));
        put(1102,new Struct_changshu_101(1102,"战力压制生效的战力最大差值2（PVE）",300000000));
        put(1103,new Struct_changshu_101(1103,"战力压制生效的战力最大差值3（PVE）",600000000));
        put(1104,new Struct_changshu_101(1104,"战力压制生效的战力最大差值4（PVE）",800000000));
        put(1105,new Struct_changshu_101(1105,"战力压制生效的战力最大差值5（PVE）",1000000000));
        put(1201,new Struct_changshu_101(1201,"战力压制生效的伤害加成1（PVE）",10000));
        put(1202,new Struct_changshu_101(1202,"战力压制生效的伤害加成2（PVE）",20000));
        put(1203,new Struct_changshu_101(1203,"战力压制生效的伤害加成3（PVE）",50000));
        put(1204,new Struct_changshu_101(1204,"战力压制生效的伤害加成4（PVE）",75000));
        put(1205,new Struct_changshu_101(1205,"战力压制生效的伤害加成5（PVE）",100000));
        put(1301,new Struct_changshu_101(1301,"战力压制生效的伤害减免1（PVE）",5000));
        put(1302,new Struct_changshu_101(1302,"战力压制生效的伤害减免2（PVE）",10000));
        put(1303,new Struct_changshu_101(1303,"战力压制生效的伤害减免3（PVE）",30000));
        put(1304,new Struct_changshu_101(1304,"战力压制生效的伤害减免4（PVE）",60000));
        put(1305,new Struct_changshu_101(1305,"战力压制生效的伤害减免5（PVE）",80000));
        put(2001,new Struct_changshu_101(2001,"最大伤害限制比例",20000));
        put(3001,new Struct_changshu_101(3001,"战力压制生效的战力比例1（PVP）",5000));
        put(3002,new Struct_changshu_101(3002,"战力压制生效的战力比例2（PVP）",10000));
        put(3003,new Struct_changshu_101(3003,"战力压制生效的战力比例3（PVP）",15000));
        put(3004,new Struct_changshu_101(3004,"战力压制生效的战力比例4（PVP）",20000));
        put(3005,new Struct_changshu_101(3005,"战力压制生效的战力比例5（PVP）",25000));
        put(3006,new Struct_changshu_101(3006,"战力压制生效的战力比例6（PVP）",30000));
        put(3101,new Struct_changshu_101(3101,"战力压制生效的战力最大差值1（PVP）",200000000));
        put(3102,new Struct_changshu_101(3102,"战力压制生效的战力最大差值2（PVP）",400000000));
        put(3103,new Struct_changshu_101(3103,"战力压制生效的战力最大差值3（PVP）",600000000));
        put(3104,new Struct_changshu_101(3104,"战力压制生效的战力最大差值4（PVP）",800000000));
        put(3105,new Struct_changshu_101(3105,"战力压制生效的战力最大差值5（PVP）",1000000000));
        put(3106,new Struct_changshu_101(3106,"战力压制生效的战力最大差值6（PVP）",1200000000));
        put(3201,new Struct_changshu_101(3201,"战力压制生效的伤害加成1（PVP）",5000));
        put(3202,new Struct_changshu_101(3202,"战力压制生效的伤害加成2（PVP）",10000));
        put(3203,new Struct_changshu_101(3203,"战力压制生效的伤害加成3（PVP）",15000));
        put(3204,new Struct_changshu_101(3204,"战力压制生效的伤害加成4（PVP）",20000));
        put(3205,new Struct_changshu_101(3205,"战力压制生效的伤害加成5（PVP）",25000));
        put(3206,new Struct_changshu_101(3206,"战力压制生效的伤害加成6（PVP）",30000));
        put(3301,new Struct_changshu_101(3301,"战力压制生效的伤害减免1（PVP）",5000));
        put(3302,new Struct_changshu_101(3302,"战力压制生效的伤害减免2（PVP）",12000));
        put(3303,new Struct_changshu_101(3303,"战力压制生效的伤害减免3（PVP）",20000));
        put(3304,new Struct_changshu_101(3304,"战力压制生效的伤害减免4（PVP）",30000));
        put(3305,new Struct_changshu_101(3305,"战力压制生效的伤害减免5（PVP）",35000));
        put(3306,new Struct_changshu_101(3306,"战力压制生效的伤害减免6（PVP）",40000));
    }
    public void reset(){
        ins = null;
    }
}