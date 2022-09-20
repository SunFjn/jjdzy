package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hdfl_012;
public class Config_hdfl_012 extends ConfigBase<Struct_hdfl_012> {
    private static Config_hdfl_012 ins = null;
    public static Config_hdfl_012 getIns(){
        if(ins==null){
            ins = new Config_hdfl_012();
        }
        return ins;
    }
    private Config_hdfl_012(){
        put(1,new Struct_hdfl_012(1,6101,1,10,16,0,1));
        put(2,new Struct_hdfl_012(2,6102,1,10,16,0,1));
        put(3,new Struct_hdfl_012(3,6103,1,10,16,0,1));
        put(4,new Struct_hdfl_012(4,6104,1,10,16,0,1));
        put(5,new Struct_hdfl_012(5,4520,1,8,28,4510,0));
        put(6,new Struct_hdfl_012(6,4521,1,8,28,4512,0));
        put(7,new Struct_hdfl_012(7,4522,1,8,14,4504,0));
        put(8,new Struct_hdfl_012(8,4523,1,8,28,4514,0));
        put(9,new Struct_hdfl_012(9,4618,1,8,28,4612,0));
        put(10,new Struct_hdfl_012(10,4616,1,8,14,4607,0));
        put(11,new Struct_hdfl_012(11,4617,1,0,0,4605,0));
        put(12,new Struct_hdfl_012(12,4620,1,8,14,4614,0));
        put(13,new Struct_hdfl_012(13,4524,1,8,14,4506,0));
        put(15,new Struct_hdfl_012(15,6403,1,3,9,0,1));
        put(16,new Struct_hdfl_012(16,6404,1,3,9,0,1));
        put(17,new Struct_hdfl_012(17,6405,1,3,9,0,1));
        put(18,new Struct_hdfl_012(18,6406,1,3,9,0,1));
        put(19,new Struct_hdfl_012(19,6802,1,16,22,0,1));
        put(20,new Struct_hdfl_012(20,6803,1,16,22,0,1));
        put(21,new Struct_hdfl_012(21,6804,1,16,22,0,1));
        put(22,new Struct_hdfl_012(22,6805,1,16,22,0,1));
        put(23,new Struct_hdfl_012(23,6806,1,16,22,0,1));
        put(24,new Struct_hdfl_012(24,4616,2,15,21,4607,0));
        put(25,new Struct_hdfl_012(25,4616,3,22,28,4607,0));
        put(26,new Struct_hdfl_012(26,4524,2,15,21,4506,0));
        put(27,new Struct_hdfl_012(27,4524,3,22,28,4506,0));
        put(28,new Struct_hdfl_012(28,4522,2,15,21,4504,0));
        put(29,new Struct_hdfl_012(29,4522,3,22,28,4504,0));
        put(30,new Struct_hdfl_012(30,4620,2,15,21,4614,0));
        put(31,new Struct_hdfl_012(31,4620,3,22,28,4614,0));
        put(32,new Struct_hdfl_012(32,4525,1,8,14,4508,0));
        put(33,new Struct_hdfl_012(33,4525,2,15,21,4508,0));
        put(34,new Struct_hdfl_012(34,4525,3,22,28,4508,0));
        put(35,new Struct_hdfl_012(35,4526,1,8,14,5010,0));
        put(36,new Struct_hdfl_012(36,4526,2,15,21,5010,0));
        put(37,new Struct_hdfl_012(37,4526,3,22,28,5010,0));
        put(38,new Struct_hdfl_012(38,6105,1,10,16,0,0));
        put(39,new Struct_hdfl_012(39,6407,1,3,9,0,0));
        put(40,new Struct_hdfl_012(40,6807,1,16,22,0,0));
        put(41,new Struct_hdfl_012(41,4527,1,8,28,0,0));
        put(42,new Struct_hdfl_012(42,7306,1,23,29,0,0));
        put(43,new Struct_hdfl_012(43,7305,1,23,29,0,0));
        put(44,new Struct_hdfl_012(44,7302,1,23,29,0,0));
        put(45,new Struct_hdfl_012(45,7301,1,23,29,0,0));
        put(46,new Struct_hdfl_012(46,7304,1,23,29,0,0));
        put(47,new Struct_hdfl_012(47,7303,1,23,29,0,0));
        put(48,new Struct_hdfl_012(48,6408,1,3,9,0,0));
        put(49,new Struct_hdfl_012(49,7305,2,30,36,0,0));
        put(50,new Struct_hdfl_012(50,7501,1,30,36,0,0));
        put(51,new Struct_hdfl_012(51,7502,1,30,36,0,0));
        put(53,new Struct_hdfl_012(53,7302,2,30,36,0,0));
        put(54,new Struct_hdfl_012(54,7305,3,37,43,0,0));
        put(55,new Struct_hdfl_012(55,7712,3,37,43,0,0));
        put(56,new Struct_hdfl_012(56,7302,3,37,43,0,0));
        put(57,new Struct_hdfl_012(57,7301,3,37,43,0,0));
        put(58,new Struct_hdfl_012(58,7715,3,37,43,0,0));
        put(59,new Struct_hdfl_012(59,7303,3,37,43,0,0));
        put(60,new Struct_hdfl_012(60,7751,1,35,41,0,0));
        put(61,new Struct_hdfl_012(61,7305,4,35,41,0,0));
        put(64,new Struct_hdfl_012(64,7502,2,35,41,0,0));
        put(63,new Struct_hdfl_012(63,7302,4,35,41,0,0));
        put(65,new Struct_hdfl_012(65,7305,5,42,48,0,0));
        put(66,new Struct_hdfl_012(66,7301,4,42,48,0,0));
        put(67,new Struct_hdfl_012(67,7302,5,42,48,0,0));
        put(68,new Struct_hdfl_012(68,7303,4,42,48,0,0));
        put(69,new Struct_hdfl_012(69,7751,2,42,48,0,0));
        put(70,new Struct_hdfl_012(70,8001,101,0,14,0,1));
        put(71,new Struct_hdfl_012(71,8002,201,0,14,0,1));
    }
    public void reset(){
        ins = null;
    }
}