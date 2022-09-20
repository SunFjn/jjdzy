package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fb_200;
public class Config_fb_200 extends ConfigBase<Struct_fb_200> {
    private static Config_fb_200 ins = null;
    public static Config_fb_200 getIns(){
        if(ins==null){
            ins = new Config_fb_200();
        }
        return ins;
    }
    private Config_fb_200(){
        put(1,new Struct_fb_200(1,1503,0,2));
        put(2,new Struct_fb_200(2,1504,0,2));
        put(3,new Struct_fb_200(3,1505,0,1));
        put(4,new Struct_fb_200(4,1602,0,2));
        put(5,new Struct_fb_200(5,1603,0,2));
        put(6,new Struct_fb_200(6,1604,0,2));
        put(7,new Struct_fb_200(7,1702,0,1));
        put(8,new Struct_fb_200(8,1703,1,1));
        put(9,new Struct_fb_200(9,1703,2,1));
        put(10,new Struct_fb_200(10,1703,3,1));
        put(11,new Struct_fb_200(11,1703,4,1));
        put(12,new Struct_fb_200(12,1703,5,1));
        put(13,new Struct_fb_200(13,1703,6,1));
        put(14,new Struct_fb_200(14,1703,7,1));
        put(15,new Struct_fb_200(15,1703,8,1));
        put(16,new Struct_fb_200(16,1703,9,1));
        put(17,new Struct_fb_200(17,1703,10,1));
        put(18,new Struct_fb_200(18,1703,11,1));
        put(19,new Struct_fb_200(19,1704,1,1));
        put(20,new Struct_fb_200(20,1704,2,1));
        put(21,new Struct_fb_200(21,1704,3,1));
        put(22,new Struct_fb_200(22,1704,4,1));
        put(23,new Struct_fb_200(23,1705,0,1));
        put(24,new Struct_fb_200(24,1802,1,1));
        put(25,new Struct_fb_200(25,1802,2,1));
        put(26,new Struct_fb_200(26,1802,3,1));
        put(27,new Struct_fb_200(27,1802,4,1));
        put(28,new Struct_fb_200(28,1802,5,1));
        put(29,new Struct_fb_200(29,1802,6,1));
        put(30,new Struct_fb_200(30,1802,7,1));
        put(31,new Struct_fb_200(31,1802,8,1));
        put(32,new Struct_fb_200(32,1802,9,1));
        put(33,new Struct_fb_200(33,1802,10,1));
        put(34,new Struct_fb_200(34,1802,11,1));
        put(35,new Struct_fb_200(35,1802,12,1));
        put(36,new Struct_fb_200(36,1802,13,1));
        put(37,new Struct_fb_200(37,1803,1,1));
        put(38,new Struct_fb_200(38,1803,2,1));
        put(39,new Struct_fb_200(39,1803,3,1));
        put(40,new Struct_fb_200(40,1803,4,1));
        put(41,new Struct_fb_200(41,1803,5,1));
        put(42,new Struct_fb_200(42,1803,6,1));
        put(43,new Struct_fb_200(43,1803,7,1));
        put(44,new Struct_fb_200(44,1803,8,1));
        put(45,new Struct_fb_200(45,1803,9,1));
        put(46,new Struct_fb_200(46,1803,10,1));
        put(47,new Struct_fb_200(47,1803,11,1));
        put(48,new Struct_fb_200(48,1803,12,1));
        put(49,new Struct_fb_200(49,1803,13,1));
        put(50,new Struct_fb_200(50,1804,1,1));
        put(51,new Struct_fb_200(51,1804,2,1));
        put(52,new Struct_fb_200(52,1804,3,1));
        put(53,new Struct_fb_200(53,1804,4,1));
        put(54,new Struct_fb_200(54,1804,5,1));
        put(55,new Struct_fb_200(55,1805,0,1));
        put(56,new Struct_fb_200(56,3602,0,2));
        put(57,new Struct_fb_200(57,3603,0,2));
        put(58,new Struct_fb_200(58,3604,1,1));
        put(59,new Struct_fb_200(59,3604,2,1));
        put(60,new Struct_fb_200(60,3604,3,1));
        put(61,new Struct_fb_200(61,3604,4,1));
        put(62,new Struct_fb_200(62,3604,5,1));
        put(63,new Struct_fb_200(63,3604,6,1));
        put(64,new Struct_fb_200(64,3604,7,1));
        put(65,new Struct_fb_200(65,3604,8,1));
        put(66,new Struct_fb_200(66,3604,9,1));
        put(67,new Struct_fb_200(67,3604,10,1));
        put(68,new Struct_fb_200(68,3604,11,1));
        put(69,new Struct_fb_200(69,3604,12,1));
        put(70,new Struct_fb_200(70,3605,1,1));
        put(71,new Struct_fb_200(71,3605,2,1));
        put(72,new Struct_fb_200(72,3605,3,1));
        put(73,new Struct_fb_200(73,3605,4,1));
        put(74,new Struct_fb_200(74,3605,5,1));
        put(75,new Struct_fb_200(75,3605,6,1));
        put(76,new Struct_fb_200(76,3605,7,1));
        put(77,new Struct_fb_200(77,3703,0,2));
        put(78,new Struct_fb_200(78,4606,0,1));
        put(79,new Struct_fb_200(79,4607,0,1));
    }
    public void reset(){
        ins = null;
    }
}