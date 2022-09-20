package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sycs_762;
public class Config_sycs_762 extends ConfigBase<Struct_sycs_762> {
    private static Config_sycs_762 ins = null;
    public static Config_sycs_762 getIns(){
        if(ins==null){
            ins = new Config_sycs_762();
        }
        return ins;
    }
    private Config_sycs_762(){
        put(1,new Struct_sycs_762(1,"[[4,0,5000]]"));
        put(2,new Struct_sycs_762(2,"[[4,0,10000]]"));
    }
    public void reset(){
        ins = null;
    }
}