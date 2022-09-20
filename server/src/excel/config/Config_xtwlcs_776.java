package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xtwlcs_776;
public class Config_xtwlcs_776 extends ConfigBase<Struct_xtwlcs_776> {
    private static Config_xtwlcs_776 ins = null;
    public static Config_xtwlcs_776 getIns(){
        if(ins==null){
            ins = new Config_xtwlcs_776();
        }
        return ins;
    }
    private Config_xtwlcs_776(){
        put(1,new Struct_xtwlcs_776(1,"[[4,0,5000]]"));
        put(2,new Struct_xtwlcs_776(2,"[[4,0,7500]]"));
        put(3,new Struct_xtwlcs_776(3,"[[4,0,15000]]"));
    }
    public void reset(){
        ins = null;
    }
}