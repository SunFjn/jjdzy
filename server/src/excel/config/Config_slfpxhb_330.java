package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_slfpxhb_330;
public class Config_slfpxhb_330 extends ConfigBase<Struct_slfpxhb_330> {
    private static Config_slfpxhb_330 ins = null;
    public static Config_slfpxhb_330 getIns(){
        if(ins==null){
            ins = new Config_slfpxhb_330();
        }
        return ins;
    }
    private Config_slfpxhb_330(){
        put(1001,new Struct_slfpxhb_330(1001,1,1500,1));
        put(1002,new Struct_slfpxhb_330(1002,2,2750,1));
        put(1003,new Struct_slfpxhb_330(1003,3,26950,1));
        put(2001,new Struct_slfpxhb_330(2001,1,1500,2));
        put(2002,new Struct_slfpxhb_330(2002,2,2750,2));
        put(2003,new Struct_slfpxhb_330(2003,3,26950,2));
        put(3001,new Struct_slfpxhb_330(3001,1,1500,3));
        put(3002,new Struct_slfpxhb_330(3002,2,2750,3));
        put(3003,new Struct_slfpxhb_330(3003,3,26950,3));
        put(4001,new Struct_slfpxhb_330(4001,1,1500,4));
        put(4002,new Struct_slfpxhb_330(4002,2,2750,4));
        put(4003,new Struct_slfpxhb_330(4003,3,26950,4));
        put(5001,new Struct_slfpxhb_330(5001,1,1500,5));
        put(5002,new Struct_slfpxhb_330(5002,2,2750,5));
        put(5003,new Struct_slfpxhb_330(5003,3,26950,5));
        put(6001,new Struct_slfpxhb_330(6001,1,1500,6));
        put(6002,new Struct_slfpxhb_330(6002,2,2750,6));
        put(6003,new Struct_slfpxhb_330(6003,3,26950,6));
        put(7001,new Struct_slfpxhb_330(7001,1,1500,7));
        put(7002,new Struct_slfpxhb_330(7002,2,2750,7));
        put(7003,new Struct_slfpxhb_330(7003,3,26950,7));
        put(8001,new Struct_slfpxhb_330(8001,1,1500,8));
        put(8002,new Struct_slfpxhb_330(8002,2,2500,8));
        put(8003,new Struct_slfpxhb_330(8003,3,24500,8));
    }
    public void reset(){
        ins = null;
    }
}