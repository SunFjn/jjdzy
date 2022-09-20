package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_yssljh_018;
public class Config_yssljh_018 extends ConfigBase<Struct_yssljh_018> {
    private static Config_yssljh_018 ins = null;
    public static Config_yssljh_018 getIns(){
        if(ins==null){
            ins = new Config_yssljh_018();
        }
        return ins;
    }
    private Config_yssljh_018(){
        put(10001,new Struct_yssljh_018(10001,1,1,30));
        put(10002,new Struct_yssljh_018(10002,2,1,98));
        put(10003,new Struct_yssljh_018(10003,3,1,198));
        put(10004,new Struct_yssljh_018(10004,4,1,488));
        put(20001,new Struct_yssljh_018(20001,1,2,30));
        put(20002,new Struct_yssljh_018(20002,2,2,98));
        put(20003,new Struct_yssljh_018(20003,3,2,198));
        put(20004,new Struct_yssljh_018(20004,4,2,488));
    }
    public void reset(){
        ins = null;
    }
}