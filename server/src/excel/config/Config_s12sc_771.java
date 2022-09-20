package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_s12sc_771;
public class Config_s12sc_771 extends ConfigBase<Struct_s12sc_771> {
    private static Config_s12sc_771 ins = null;
    public static Config_s12sc_771 getIns(){
        if(ins==null){
            ins = new Config_s12sc_771();
        }
        return ins;
    }
    private Config_s12sc_771(){
        put(1001,new Struct_s12sc_771(1001,1,1,"七星灯","[[1,431223,1]]","[[4,0,900000]]","[[4,0,90000]]",2));
        put(1002,new Struct_s12sc_771(1002,1,2,"武将·许褚","[[1,440013,1]]","[[4,0,900000]]","[[4,0,90000]]",2));
        put(1003,new Struct_s12sc_771(1003,1,3,"莫邪剑","[[1,430003,1]]","[[4,0,900000]]","[[4,0,90000]]",2));
        put(1004,new Struct_s12sc_771(1004,1,4,"太平要术","[[1,432004,1]]","[[4,0,1125000]]","[[4,0,112500]]",2));
        put(1005,new Struct_s12sc_771(1005,1,5,"于吉仙衣","[[1,441010,1]]","[[4,0,1125000]]","[[4,0,112500]]",2));
        put(1006,new Struct_s12sc_771(1006,1,6,"傀儡娃娃","[[1,431224,1]]","[[4,0,1200000]]","[[4,0,120000]]",2));
        put(1007,new Struct_s12sc_771(1007,1,7,"太平道袍","[[1,441011,1]]","[[4,0,1000000]]","[[4,0,100000]]",2));
        put(1008,new Struct_s12sc_771(1008,1,8,"太平清领","[[1,432005,1]]","[[4,0,1200000]]","[[4,0,120000]]",2));
        put(1009,new Struct_s12sc_771(1009,1,9,"黄帝阴符经","[[1,433012,1]]","[[4,0,1350000]]","[[4,0,135000]]",2));
        put(1010,new Struct_s12sc_771(1010,1,10,"天师道袍","[[1,441012,1]]","[[4,0,1500000]]","[[4,0,150000]]",2));
        put(1011,new Struct_s12sc_771(1011,1,11,"兵法培养丹","[[1,411004,1]]","[[4,0,500]]","[[4,0,50]]",99));
        put(1012,new Struct_s12sc_771(1012,1,12,"异宝培养丹","[[1,411005,1]]","[[4,0,500]]","[[4,0,50]]",99));
        put(1013,new Struct_s12sc_771(1013,1,13,"图鉴培养丹","[[1,411006,1]]","[[4,0,500]]","[[4,0,50]]",99));
        put(1014,new Struct_s12sc_771(1014,1,14,"魂火","[[10,0,2]]","[[4,0,500]]","[[4,0,50]]",99));
        put(1015,new Struct_s12sc_771(1015,1,15,"星宿培养丹","[[1,410058,1]]","[[4,0,500]]","[[4,0,50]]",99));
        put(1016,new Struct_s12sc_771(1016,1,16,"神装洗练丹","[[1,410051,1]]","[[4,0,7500]]","[[4,0,750]]",99));
        put(2001,new Struct_s12sc_771(2001,2,1,"火云神符","[[1,402036,1]]","[[4,0,30000000]]","[[4,0,2400000]]",5));
        put(2002,new Struct_s12sc_771(2002,2,2,"神威神符","[[1,402037,1]]","[[4,0,30000000]]","[[4,0,2400000]]",5));
        put(2003,new Struct_s12sc_771(2003,2,3,"炼狱神符","[[1,402038,1]]","[[4,0,30000000]]","[[4,0,2400000]]",5));
        put(2004,new Struct_s12sc_771(2004,2,4,"天齐神符","[[1,402039,1]]","[[4,0,30000000]]","[[4,0,2400000]]",5));
        put(2005,new Struct_s12sc_771(2005,2,5,"随机培养丹","[[1,400175,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(2006,new Struct_s12sc_771(2006,2,6,"神兵淬炼丹","[[1,411010,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(2007,new Struct_s12sc_771(2007,2,7,"星宿培养丹","[[1,410058,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(2008,new Struct_s12sc_771(2008,2,8,"一盒酥","[[1,410054,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(2009,new Struct_s12sc_771(2009,2,9,"星宿培养丹","[[1,410058,3088]]","[[4,0,1544000]]","[[4,0,92500]]",2));
        put(2010,new Struct_s12sc_771(2010,2,10,"异兽灵元丹","[[1,410092,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(2011,new Struct_s12sc_771(2011,2,11,"天赋培养丹","[[1,411011,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(2012,new Struct_s12sc_771(2012,2,12,"阵纹石","[[1,411013,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(2013,new Struct_s12sc_771(2013,2,13,"异兽灵元丹","[[1,410092,7888]]","[[4,0,3944000]]","[[4,0,276000]]",50));
        put(2014,new Struct_s12sc_771(2014,2,14,"天赋培养丹","[[1,411011,7888]]","[[4,0,3944000]]","[[4,0,276000]]",50));
        put(2015,new Struct_s12sc_771(2015,2,15,"神兵淬炼丹","[[1,411010,7888]]","[[4,0,3944000]]","[[4,0,276000]]",50));
        put(2016,new Struct_s12sc_771(2016,2,16,"随机属性丹","[[1,400176,10]]","[[4,0,100000]]","[[4,0,5000]]",6));
        put(2017,new Struct_s12sc_771(2017,2,17,"天外陨铁","[[1,410088,10]]","[[4,0,2000000]]","[[4,0,140000]]",7));
        put(2018,new Struct_s12sc_771(2018,2,18,"技能洗练书","[[1,410065,100]]","[[4,0,500000]]","[[4,0,40000]]",5));
        put(2019,new Struct_s12sc_771(2019,2,19,"高级铸魂石","[[1,410005,100]]","[[4,0,500000]]","[[4,0,50000]]",10));
        put(2020,new Struct_s12sc_771(2020,2,20,"紫色随机礼盒","[[1,402004,1]]","[[4,0,2250000]]","[[4,0,135000]]",1));
        put(2021,new Struct_s12sc_771(2021,2,21,"神将印记","[[1,410305,100]]","[[4,0,500000]]","[[4,0,50000]]",10));
        put(2022,new Struct_s12sc_771(2022,2,22,"橙色随机礼盒","[[1,402005,1]]","[[4,0,4500000]]","[[4,0,270000]]",2));
        put(2023,new Struct_s12sc_771(2023,2,23,"神将印记","[[1,410305,1500]]","[[4,0,7500000]]","[[4,0,1500000]]",10));
        put(2024,new Struct_s12sc_771(2024,2,24,"轮回丹","[[1,416001,1]]","[[4,0,8750000]]","[[4,0,700000]]",5));
        put(2025,new Struct_s12sc_771(2025,2,25,"红色符文","[[1,400892,2]]","[[4,0,20000000]]","[[4,0,1600000]]",2));
        put(2026,new Struct_s12sc_771(2026,2,26,"孙鲁育","[[1,442003,2]]","[[4,0,30000000]]","[[4,0,2100000]]",2));
        put(2027,new Struct_s12sc_771(2027,2,27,"九宫阵眼","[[1,446003,2]]","[[4,0,10000000]]","[[4,0,2000000]]",4));
        put(2028,new Struct_s12sc_771(2028,2,28,"太极阵心","[[1,446101,1]]","[[4,0,20000000]]","[[4,0,2200000]]",1));
        put(2029,new Struct_s12sc_771(2029,2,29,"白泽碎片","[[1,444008,100]]","[[4,0,12500000]]","[[4,0,1875000]]",2));
        put(2030,new Struct_s12sc_771(2030,2,30,"随机毕方","[[1,401044,2]]","[[4,0,7500000]]","[[4,0,1125000]]",2));
        put(2031,new Struct_s12sc_771(2031,2,31,"随机白泽","[[1,401056,2]]","[[4,0,7500000]]","[[4,0,1125000]]",2));
        put(3001,new Struct_s12sc_771(3001,3,1,"巨神神符","[[1,402049,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(3002,new Struct_s12sc_771(3002,3,2,"坚韧神符","[[1,402050,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(3003,new Struct_s12sc_771(3003,3,3,"先锋神符","[[1,402051,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(3004,new Struct_s12sc_771(3004,3,4,"神威神符","[[1,402037,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(3005,new Struct_s12sc_771(3005,3,5,"轮回丹","[[1,416001,1]]","[[4,0,8750000]]","[[4,0,700000]]",5));
        put(3006,new Struct_s12sc_771(3006,3,6,"太极阵心","[[1,446101,1]]","[[4,0,20000000]]","[[4,0,1400000]]",1));
        put(3007,new Struct_s12sc_771(3007,3,7,"红色符文","[[1,400892,1]]","[[4,0,10000000]]","[[4,0,600000]]",2));
        put(3008,new Struct_s12sc_771(3008,3,8,"孙鲁育","[[1,442003,1]]","[[4,0,15000000]]","[[4,0,900000]]",2));
        put(3009,new Struct_s12sc_771(3009,3,9,"九宫阵眼","[[1,446003,2]]","[[4,0,10000000]]","[[4,0,700000]]",2));
        put(3010,new Struct_s12sc_771(3010,3,10,"白泽碎片","[[1,444008,100]]","[[4,0,12500000]]","[[4,0,625000]]",2));
        put(3011,new Struct_s12sc_771(3011,3,11,"随机毕方","[[1,401044,2]]","[[4,0,7500000]]","[[4,0,375000]]",2));
        put(3012,new Struct_s12sc_771(3012,3,12,"随机白泽","[[1,401056,2]]","[[4,0,7500000]]","[[4,0,375000]]",2));
        put(3013,new Struct_s12sc_771(3013,3,13,"紫色随机礼盒","[[1,402004,1]]","[[4,0,2250000]]","[[4,0,135000]]",1));
        put(3014,new Struct_s12sc_771(3014,3,14,"随机属性丹","[[1,400176,10]]","[[4,0,100000]]","[[4,0,5000]]",6));
        put(3015,new Struct_s12sc_771(3015,3,15,"天外陨铁","[[1,410088,10]]","[[4,0,2000000]]","[[4,0,140000]]",7));
        put(3016,new Struct_s12sc_771(3016,3,16,"技能洗练书","[[1,410065,100]]","[[4,0,500000]]","[[4,0,40000]]",5));
        put(3017,new Struct_s12sc_771(3017,3,17,"橙色随机礼盒","[[1,402005,1]]","[[4,0,4500000]]","[[4,0,270000]]",2));
        put(3018,new Struct_s12sc_771(3018,3,18,"神将印记","[[1,410305,500]]","[[4,0,2500000]]","[[4,0,375000]]",10));
        put(3019,new Struct_s12sc_771(3019,3,19,"神兵淬炼丹","[[1,411010,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(3020,new Struct_s12sc_771(3020,3,20,"随机培养丹","[[1,400175,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(3021,new Struct_s12sc_771(3021,3,21,"神兵淬炼丹","[[1,411010,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(3022,new Struct_s12sc_771(3022,3,22,"星宿培养丹","[[1,410058,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(3023,new Struct_s12sc_771(3023,3,23,"一盒酥","[[1,410054,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(3024,new Struct_s12sc_771(3024,3,24,"星宿培养丹","[[1,410058,3088]]","[[4,0,1544000]]","[[4,0,92500]]",2));
        put(3025,new Struct_s12sc_771(3025,3,25,"异兽灵元丹","[[1,410092,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(3026,new Struct_s12sc_771(3026,3,26,"天赋培养丹","[[1,411011,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(3027,new Struct_s12sc_771(3027,3,27,"阵纹石","[[1,411013,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(3028,new Struct_s12sc_771(3028,3,28,"高级铸魂石","[[1,410005,100]]","[[4,0,500000]]","[[4,0,50000]]",10));
        put(3029,new Struct_s12sc_771(3029,3,29,"异兽灵元丹","[[1,410092,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(3030,new Struct_s12sc_771(3030,3,30,"天赋培养丹","[[1,411011,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(4001,new Struct_s12sc_771(4001,4,1,"火云神符","[[1,402036,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(4002,new Struct_s12sc_771(4002,4,2,"神威神符","[[1,402037,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(4003,new Struct_s12sc_771(4003,4,3,"炼狱神符","[[1,402038,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(4004,new Struct_s12sc_771(4004,4,4,"天齐神符","[[1,402039,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(4005,new Struct_s12sc_771(4005,4,5,"轮回丹","[[1,416001,1]]","[[4,0,8750000]]","[[4,0,700000]]",5));
        put(4006,new Struct_s12sc_771(4006,4,6,"太极阵心","[[1,446101,1]]","[[4,0,20000000]]","[[4,0,1400000]]",1));
        put(4007,new Struct_s12sc_771(4007,4,7,"红色符文","[[1,400892,1]]","[[4,0,10000000]]","[[4,0,600000]]",2));
        put(4008,new Struct_s12sc_771(4008,4,8,"孙鲁育","[[1,442003,1]]","[[4,0,15000000]]","[[4,0,900000]]",2));
        put(4009,new Struct_s12sc_771(4009,4,9,"九宫阵眼","[[1,446003,2]]","[[4,0,10000000]]","[[4,0,700000]]",2));
        put(4010,new Struct_s12sc_771(4010,4,10,"白泽碎片","[[1,444008,100]]","[[4,0,12500000]]","[[4,0,625000]]",2));
        put(4011,new Struct_s12sc_771(4011,4,11,"随机毕方","[[1,401044,2]]","[[4,0,7500000]]","[[4,0,375000]]",2));
        put(4012,new Struct_s12sc_771(4012,4,12,"随机白泽","[[1,401056,2]]","[[4,0,7500000]]","[[4,0,375000]]",2));
        put(4013,new Struct_s12sc_771(4013,4,13,"紫色随机礼盒","[[1,402004,1]]","[[4,0,2250000]]","[[4,0,135000]]",1));
        put(4014,new Struct_s12sc_771(4014,4,14,"随机属性丹","[[1,400176,10]]","[[4,0,100000]]","[[4,0,5000]]",6));
        put(4015,new Struct_s12sc_771(4015,4,15,"天外陨铁","[[1,410088,10]]","[[4,0,2000000]]","[[4,0,140000]]",7));
        put(4016,new Struct_s12sc_771(4016,4,16,"技能洗练书","[[1,410065,100]]","[[4,0,500000]]","[[4,0,40000]]",5));
        put(4017,new Struct_s12sc_771(4017,4,17,"橙色随机礼盒","[[1,402005,1]]","[[4,0,4500000]]","[[4,0,270000]]",2));
        put(4018,new Struct_s12sc_771(4018,4,18,"神将印记","[[1,410305,500]]","[[4,0,2500000]]","[[4,0,375000]]",10));
        put(4019,new Struct_s12sc_771(4019,4,19,"神兵淬炼丹","[[1,411010,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(4020,new Struct_s12sc_771(4020,4,20,"随机培养丹","[[1,400175,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(4021,new Struct_s12sc_771(4021,4,21,"神兵淬炼丹","[[1,411010,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(4022,new Struct_s12sc_771(4022,4,22,"星宿培养丹","[[1,410058,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(4023,new Struct_s12sc_771(4023,4,23,"一盒酥","[[1,410054,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(4024,new Struct_s12sc_771(4024,4,24,"星宿培养丹","[[1,410058,3088]]","[[4,0,1544000]]","[[4,0,92500]]",2));
        put(4025,new Struct_s12sc_771(4025,4,25,"异兽灵元丹","[[1,410092,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(4026,new Struct_s12sc_771(4026,4,26,"天赋培养丹","[[1,411011,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(4027,new Struct_s12sc_771(4027,4,27,"阵纹石","[[1,411013,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(4028,new Struct_s12sc_771(4028,4,28,"高级铸魂石","[[1,410005,100]]","[[4,0,500000]]","[[4,0,50000]]",10));
        put(4029,new Struct_s12sc_771(4029,4,29,"异兽灵元丹","[[1,410092,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(4030,new Struct_s12sc_771(4030,4,30,"天赋培养丹","[[1,411011,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(5001,new Struct_s12sc_771(5001,5,1,"火云神符","[[1,402036,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(5002,new Struct_s12sc_771(5002,5,2,"神威神符","[[1,402037,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(5003,new Struct_s12sc_771(5003,5,3,"炼狱神符","[[1,402038,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(5004,new Struct_s12sc_771(5004,5,4,"天齐神符","[[1,402039,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(5005,new Struct_s12sc_771(5005,5,5,"轮回丹","[[1,416001,1]]","[[4,0,8750000]]","[[4,0,700000]]",5));
        put(5006,new Struct_s12sc_771(5006,5,6,"太极阵心","[[1,446101,1]]","[[4,0,20000000]]","[[4,0,1400000]]",1));
        put(5007,new Struct_s12sc_771(5007,5,7,"红色符文","[[1,400892,1]]","[[4,0,10000000]]","[[4,0,600000]]",2));
        put(5008,new Struct_s12sc_771(5008,5,8,"孙鲁育","[[1,442003,1]]","[[4,0,15000000]]","[[4,0,900000]]",2));
        put(5009,new Struct_s12sc_771(5009,5,9,"九宫阵眼","[[1,446003,2]]","[[4,0,10000000]]","[[4,0,700000]]",2));
        put(5010,new Struct_s12sc_771(5010,5,10,"白泽碎片","[[1,444008,100]]","[[4,0,12500000]]","[[4,0,625000]]",2));
        put(5011,new Struct_s12sc_771(5011,5,11,"随机毕方","[[1,401044,2]]","[[4,0,7500000]]","[[4,0,375000]]",2));
        put(5012,new Struct_s12sc_771(5012,5,12,"随机白泽","[[1,401056,2]]","[[4,0,7500000]]","[[4,0,375000]]",2));
        put(5013,new Struct_s12sc_771(5013,5,13,"紫色随机礼盒","[[1,402004,1]]","[[4,0,2250000]]","[[4,0,135000]]",1));
        put(5014,new Struct_s12sc_771(5014,5,14,"随机属性丹","[[1,400176,10]]","[[4,0,100000]]","[[4,0,5000]]",6));
        put(5015,new Struct_s12sc_771(5015,5,15,"天外陨铁","[[1,410088,10]]","[[4,0,2000000]]","[[4,0,140000]]",7));
        put(5016,new Struct_s12sc_771(5016,5,16,"技能洗练书","[[1,410065,100]]","[[4,0,500000]]","[[4,0,40000]]",5));
        put(5017,new Struct_s12sc_771(5017,5,17,"橙色随机礼盒","[[1,402005,1]]","[[4,0,4500000]]","[[4,0,270000]]",2));
        put(5018,new Struct_s12sc_771(5018,5,18,"神将印记","[[1,410305,500]]","[[4,0,2500000]]","[[4,0,375000]]",10));
        put(5019,new Struct_s12sc_771(5019,5,19,"神兵淬炼丹","[[1,411010,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(5020,new Struct_s12sc_771(5020,5,20,"随机培养丹","[[1,400175,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(5021,new Struct_s12sc_771(5021,5,21,"神兵淬炼丹","[[1,411010,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(5022,new Struct_s12sc_771(5022,5,22,"星宿培养丹","[[1,410058,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(5023,new Struct_s12sc_771(5023,5,23,"一盒酥","[[1,410054,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(5024,new Struct_s12sc_771(5024,5,24,"星宿培养丹","[[1,410058,3088]]","[[4,0,1544000]]","[[4,0,92500]]",2));
        put(5025,new Struct_s12sc_771(5025,5,25,"异兽灵元丹","[[1,410092,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(5026,new Struct_s12sc_771(5026,5,26,"天赋培养丹","[[1,411011,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(5027,new Struct_s12sc_771(5027,5,27,"阵纹石","[[1,411013,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(5028,new Struct_s12sc_771(5028,5,28,"高级铸魂石","[[1,410005,100]]","[[4,0,500000]]","[[4,0,50000]]",10));
        put(5029,new Struct_s12sc_771(5029,5,29,"异兽灵元丹","[[1,410092,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(5030,new Struct_s12sc_771(5030,5,30,"天赋培养丹","[[1,411011,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(6001,new Struct_s12sc_771(6001,6,1,"巨神神符","[[1,402049,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(6002,new Struct_s12sc_771(6002,6,2,"坚韧神符","[[1,402050,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(6003,new Struct_s12sc_771(6003,6,3,"先锋神符","[[1,402051,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(6004,new Struct_s12sc_771(6004,6,4,"神威神符","[[1,402037,1]]","[[4,0,30000000]]","[[4,0,1750000]]",5));
        put(6005,new Struct_s12sc_771(6005,6,5,"轮回丹","[[1,416001,1]]","[[4,0,8750000]]","[[4,0,700000]]",5));
        put(6006,new Struct_s12sc_771(6006,6,6,"太极阵心","[[1,446101,1]]","[[4,0,20000000]]","[[4,0,1400000]]",1));
        put(6007,new Struct_s12sc_771(6007,6,7,"红色符文","[[1,400892,1]]","[[4,0,10000000]]","[[4,0,600000]]",2));
        put(6008,new Struct_s12sc_771(6008,6,8,"孙鲁育","[[1,442003,1]]","[[4,0,15000000]]","[[4,0,900000]]",2));
        put(6009,new Struct_s12sc_771(6009,6,9,"九宫阵眼","[[1,446003,2]]","[[4,0,10000000]]","[[4,0,700000]]",2));
        put(6010,new Struct_s12sc_771(6010,6,10,"白泽碎片","[[1,444008,100]]","[[4,0,12500000]]","[[4,0,625000]]",2));
        put(6011,new Struct_s12sc_771(6011,6,11,"随机毕方","[[1,401044,2]]","[[4,0,7500000]]","[[4,0,375000]]",2));
        put(6012,new Struct_s12sc_771(6012,6,12,"随机白泽","[[1,401056,2]]","[[4,0,7500000]]","[[4,0,375000]]",2));
        put(6013,new Struct_s12sc_771(6013,6,13,"紫色随机礼盒","[[1,402004,1]]","[[4,0,2250000]]","[[4,0,135000]]",1));
        put(6014,new Struct_s12sc_771(6014,6,14,"随机属性丹","[[1,400176,10]]","[[4,0,100000]]","[[4,0,5000]]",6));
        put(6015,new Struct_s12sc_771(6015,6,15,"天外陨铁","[[1,410088,10]]","[[4,0,2000000]]","[[4,0,140000]]",7));
        put(6016,new Struct_s12sc_771(6016,6,16,"技能洗练书","[[1,410065,100]]","[[4,0,500000]]","[[4,0,40000]]",5));
        put(6017,new Struct_s12sc_771(6017,6,17,"橙色随机礼盒","[[1,402005,1]]","[[4,0,4500000]]","[[4,0,270000]]",2));
        put(6018,new Struct_s12sc_771(6018,6,18,"神将印记","[[1,410305,500]]","[[4,0,2500000]]","[[4,0,375000]]",10));
        put(6019,new Struct_s12sc_771(6019,6,19,"神兵淬炼丹","[[1,411010,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(6020,new Struct_s12sc_771(6020,6,20,"随机培养丹","[[1,400175,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(6021,new Struct_s12sc_771(6021,6,21,"神兵淬炼丹","[[1,411010,1388]]","[[4,0,694000]]","[[4,0,41500]]",2));
        put(6022,new Struct_s12sc_771(6022,6,22,"星宿培养丹","[[1,410058,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(6023,new Struct_s12sc_771(6023,6,23,"一盒酥","[[1,410054,1388]]","[[4,0,694000]]","[[4,0,34500]]",2));
        put(6024,new Struct_s12sc_771(6024,6,24,"星宿培养丹","[[1,410058,3088]]","[[4,0,1544000]]","[[4,0,92500]]",2));
        put(6025,new Struct_s12sc_771(6025,6,25,"异兽灵元丹","[[1,410092,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(6026,new Struct_s12sc_771(6026,6,26,"天赋培养丹","[[1,411011,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(6027,new Struct_s12sc_771(6027,6,27,"阵纹石","[[1,411013,2588]]","[[4,0,1294000]]","[[4,0,77500]]",2));
        put(6028,new Struct_s12sc_771(6028,6,28,"高级铸魂石","[[1,410005,100]]","[[4,0,500000]]","[[4,0,50000]]",10));
        put(6029,new Struct_s12sc_771(6029,6,29,"异兽灵元丹","[[1,410092,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
        put(6030,new Struct_s12sc_771(6030,6,30,"天赋培养丹","[[1,411011,5000]]","[[4,0,2500000]]","[[4,0,175000]]",5));
    }
    public void reset(){
        ins = null;
    }
}