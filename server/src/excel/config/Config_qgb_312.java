package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qgb_312;
public class Config_qgb_312 extends ConfigBase<Struct_qgb_312> {
    private static Config_qgb_312 ins = null;
    public static Config_qgb_312 getIns(){
        if(ins==null){
            ins = new Config_qgb_312();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}