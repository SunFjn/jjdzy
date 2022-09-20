package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zshddbfl_315;
public class Config_zshddbfl_315 extends ConfigBase<Struct_zshddbfl_315> {
    private static Config_zshddbfl_315 ins = null;
    public static Config_zshddbfl_315 getIns(){
        if(ins==null){
            ins = new Config_zshddbfl_315();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}