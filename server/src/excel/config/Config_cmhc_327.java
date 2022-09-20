package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cmhc_327;
public class Config_cmhc_327 extends ConfigBase<Struct_cmhc_327> {
    private static Config_cmhc_327 ins = null;
    public static Config_cmhc_327 getIns(){
        if(ins==null){
            ins = new Config_cmhc_327();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}