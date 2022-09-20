package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xhdqypm_322;
public class Config_xhdqypm_322 extends ConfigBase<Struct_xhdqypm_322> {
    private static Config_xhdqypm_322 ins = null;
    public static Config_xhdqypm_322 getIns(){
        if(ins==null){
            ins = new Config_xhdqypm_322();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}