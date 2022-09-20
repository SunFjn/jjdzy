package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xjtz_266;
public class Config_xjtz_266 extends ConfigBase<Struct_xjtz_266> {
    private static Config_xjtz_266 ins = null;
    public static Config_xjtz_266 getIns(){
        if(ins==null){
            ins = new Config_xjtz_266();
        }
        return ins;
    }
    private Config_xjtz_266(){
        put(1001,new Struct_xjtz_266(1001,1,100010,"[[110,200]]",40000));
        put(1002,new Struct_xjtz_266(1002,1,100040,"[[110,400]]",80000));
        put(1003,new Struct_xjtz_266(1003,1,100070,"[[110,800]]",160000));
        put(1004,new Struct_xjtz_266(1004,1,100090,"[[110,1200]]",240000));
        put(1005,new Struct_xjtz_266(1005,1,100110,"[[110,2000]]",400000));
        put(1006,new Struct_xjtz_266(1006,1,100140,"[[110,4000]]",800000));
        put(1007,new Struct_xjtz_266(1007,1,100170,"[[110,6000]]",1200000));
        put(1008,new Struct_xjtz_266(1008,1,100190,"[[110,8000]]",1600000));
        put(1009,new Struct_xjtz_266(1009,1,100210,"[[110,10000]]",2000000));
        put(1010,new Struct_xjtz_266(1010,1,100240,"[[110,12000]]",2400000));
        put(2001,new Struct_xjtz_266(2001,2,200010,"[[117,100]]",40000));
        put(2002,new Struct_xjtz_266(2002,2,200040,"[[117,200]]",80000));
        put(2003,new Struct_xjtz_266(2003,2,200070,"[[117,400]]",160000));
        put(2004,new Struct_xjtz_266(2004,2,200090,"[[117,600]]",240000));
        put(2005,new Struct_xjtz_266(2005,2,200110,"[[117,1000]]",400000));
        put(2006,new Struct_xjtz_266(2006,2,200140,"[[117,2000]]",800000));
        put(2007,new Struct_xjtz_266(2007,2,200170,"[[117,3000]]",1200000));
        put(2008,new Struct_xjtz_266(2008,2,200190,"[[117,4000]]",1600000));
        put(2009,new Struct_xjtz_266(2009,2,200210,"[[117,5000]]",2000000));
        put(2010,new Struct_xjtz_266(2010,2,200240,"[[117,6000]]",2400000));
        put(3001,new Struct_xjtz_266(3001,3,300010,"[[116,100]]",40000));
        put(3002,new Struct_xjtz_266(3002,3,300040,"[[116,200]]",80000));
        put(3003,new Struct_xjtz_266(3003,3,300070,"[[116,400]]",160000));
        put(3004,new Struct_xjtz_266(3004,3,300090,"[[116,600]]",240000));
        put(3005,new Struct_xjtz_266(3005,3,300110,"[[116,1000]]",400000));
        put(3006,new Struct_xjtz_266(3006,3,300140,"[[116,2000]]",800000));
        put(3007,new Struct_xjtz_266(3007,3,300170,"[[116,3000]]",1200000));
        put(3008,new Struct_xjtz_266(3008,3,300190,"[[116,4000]]",1600000));
        put(3009,new Struct_xjtz_266(3009,3,300210,"[[116,5000]]",2000000));
        put(3010,new Struct_xjtz_266(3010,3,300240,"[[116,6000]]",2400000));
        put(4001,new Struct_xjtz_266(4001,4,400010,"[[111,200]]",40000));
        put(4002,new Struct_xjtz_266(4002,4,400040,"[[111,400]]",80000));
        put(4003,new Struct_xjtz_266(4003,4,400070,"[[111,800]]",160000));
        put(4004,new Struct_xjtz_266(4004,4,400090,"[[111,1200]]",240000));
        put(4005,new Struct_xjtz_266(4005,4,400110,"[[111,2000]]",400000));
        put(4006,new Struct_xjtz_266(4006,4,400140,"[[111,4000]]",800000));
        put(4007,new Struct_xjtz_266(4007,4,400170,"[[111,6000]]",1200000));
        put(4008,new Struct_xjtz_266(4008,4,400190,"[[111,8000]]",1600000));
        put(4009,new Struct_xjtz_266(4009,4,400210,"[[111,10000]]",2000000));
        put(4010,new Struct_xjtz_266(4010,4,400240,"[[111,12000]]",2400000));
    }
    public void reset(){
        ins = null;
    }
}