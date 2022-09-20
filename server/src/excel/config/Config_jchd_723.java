package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_jchd_723;
public class Config_jchd_723 extends ConfigBase<Struct_jchd_723> {
    private static Config_jchd_723 ins = null;
    public static Config_jchd_723 getIns(){
        if(ins==null){
            ins = new Config_jchd_723();
        }
        return ins;
    }
    private Config_jchd_723(){
        put(4502,new Struct_jchd_723(4502));
        put(4509,new Struct_jchd_723(4509));
        put(4510,new Struct_jchd_723(4510));
        put(4520,new Struct_jchd_723(4520));
        put(4503,new Struct_jchd_723(4503));
        put(4511,new Struct_jchd_723(4511));
        put(4512,new Struct_jchd_723(4512));
        put(4521,new Struct_jchd_723(4521));
        put(4504,new Struct_jchd_723(4504));
        put(4522,new Struct_jchd_723(4522));
        put(4505,new Struct_jchd_723(4505));
        put(4513,new Struct_jchd_723(4513));
        put(4514,new Struct_jchd_723(4514));
        put(4523,new Struct_jchd_723(4523));
        put(4507,new Struct_jchd_723(4507));
        put(4508,new Struct_jchd_723(4508));
        put(4525,new Struct_jchd_723(4525));
        put(4506,new Struct_jchd_723(4506));
        put(4524,new Struct_jchd_723(4524));
    }
    public void reset(){
        ins = null;
    }
}