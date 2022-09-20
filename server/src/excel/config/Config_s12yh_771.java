package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_s12yh_771;
public class Config_s12yh_771 extends ConfigBase<Struct_s12yh_771> {
    private static Config_s12yh_771 ins = null;
    public static Config_s12yh_771 getIns(){
        if(ins==null){
            ins = new Config_s12yh_771();
        }
        return ins;
    }
    private Config_s12yh_771(){
        put(1001,new Struct_s12yh_771(1001,1,50000,100));
        put(1002,new Struct_s12yh_771(1002,1,500000,1000));
        put(1003,new Struct_s12yh_771(1003,1,600000,2000));
        put(1004,new Struct_s12yh_771(1004,1,1000000,8000));
        put(1005,new Struct_s12yh_771(1005,1,2000000,20000));
        put(1006,new Struct_s12yh_771(1006,1,4000000,60000));
        put(2001,new Struct_s12yh_771(2001,2,50000,500));
        put(2002,new Struct_s12yh_771(2002,2,350000,5700));
        put(2003,new Struct_s12yh_771(2003,2,1150000,24000));
        put(2004,new Struct_s12yh_771(2004,2,2000000,50000));
        put(2005,new Struct_s12yh_771(2005,2,3500000,100000));
        put(2006,new Struct_s12yh_771(2006,2,6000000,270000));
        put(2007,new Struct_s12yh_771(2007,2,9000000,510000));
        put(2008,new Struct_s12yh_771(2008,2,14500000,940000));
        put(2009,new Struct_s12yh_771(2009,2,25000000,1790000));
        put(2010,new Struct_s12yh_771(2010,2,44000000,3800000));
        put(3001,new Struct_s12yh_771(3001,3,50000,500));
        put(3002,new Struct_s12yh_771(3002,3,350000,5700));
        put(3003,new Struct_s12yh_771(3003,3,1150000,24000));
        put(3004,new Struct_s12yh_771(3004,3,2000000,50000));
        put(3005,new Struct_s12yh_771(3005,3,3500000,100000));
        put(4001,new Struct_s12yh_771(4001,4,50000,500));
        put(4002,new Struct_s12yh_771(4002,4,350000,5700));
        put(4003,new Struct_s12yh_771(4003,4,1150000,24000));
        put(4004,new Struct_s12yh_771(4004,4,2000000,50000));
        put(4005,new Struct_s12yh_771(4005,4,3500000,100000));
        put(5001,new Struct_s12yh_771(5001,5,50000,500));
        put(5002,new Struct_s12yh_771(5002,5,350000,5700));
        put(5003,new Struct_s12yh_771(5003,5,1150000,24000));
        put(5004,new Struct_s12yh_771(5004,5,2000000,50000));
        put(5005,new Struct_s12yh_771(5005,5,3500000,100000));
        put(6001,new Struct_s12yh_771(6001,6,50000,500));
        put(6002,new Struct_s12yh_771(6002,6,350000,5700));
        put(6003,new Struct_s12yh_771(6003,6,1150000,24000));
        put(6004,new Struct_s12yh_771(6004,6,2000000,50000));
        put(6005,new Struct_s12yh_771(6005,6,3500000,100000));
    }
    public void reset(){
        ins = null;
    }
}