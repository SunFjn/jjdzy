package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bztluck_261;
public class Config_bztluck_261 extends ConfigBase<Struct_bztluck_261> {
    private static Config_bztluck_261 ins = null;
    public static Config_bztluck_261 getIns(){
        if(ins==null){
            ins = new Config_bztluck_261();
        }
        return ins;
    }
    private Config_bztluck_261(){
        put(1,new Struct_bztluck_261(1,200,"[1,1004,1,100000]"));
        put(2,new Struct_bztluck_261(2,500,"[1,1014,1,10000,1;1,1024,1,10000,1;1,1034,1,10000,1;1,1044,1,10000,1;1,1054,1,10000,1;1,1064,1,10000,1;1,1074,1,10000,1;1,1084,1,10000,1;1,1094,1,10000,1;1,1104,1,10000,1]"));
        put(3,new Struct_bztluck_261(3,800,"[1,1004,1,100000]"));
        put(4,new Struct_bztluck_261(4,1000,"[1,1014,1,10000,1;1,1024,1,10000,1;1,1034,1,10000,1;1,1044,1,10000,1;1,1054,1,10000,1;1,1064,1,10000,1;1,1074,1,10000,1;1,1084,1,10000,1;1,1094,1,10000,1;1,1104,1,10000,1]"));
        put(5,new Struct_bztluck_261(5,1500,"[1,1014,1,10000,1;1,1024,1,10000,1;1,1034,1,10000,1;1,1044,1,10000,1;1,1054,1,10000,1;1,1064,1,10000,1;1,1074,1,10000,1;1,1084,1,10000,1;1,1094,1,10000,1;1,1104,1,10000,1]"));
        put(6,new Struct_bztluck_261(6,2000,"[1,1015,1,10000,1;1,1025,1,10000,1;1,1035,1,10000,1;1,1045,1,10000,1;1,1055,1,10000,1;1,1065,1,10000,1;1,1075,1,10000,1;1,1085,1,10000,1;1,1095,1,10000,1;1,1105,1,10000,1]"));
    }
    public void reset(){
        ins = null;
    }
}