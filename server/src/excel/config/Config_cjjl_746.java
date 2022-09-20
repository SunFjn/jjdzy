package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cjjl_746;
public class Config_cjjl_746 extends ConfigBase<Struct_cjjl_746> {
    private static Config_cjjl_746 ins = null;
    public static Config_cjjl_746 getIns(){
        if(ins==null){
            ins = new Config_cjjl_746();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}