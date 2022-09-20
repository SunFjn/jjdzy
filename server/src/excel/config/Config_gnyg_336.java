package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_gnyg_336;
public class Config_gnyg_336 extends ConfigBase<Struct_gnyg_336> {
    private static Config_gnyg_336 ins = null;
    public static Config_gnyg_336 getIns(){
        if(ins==null){
            ins = new Config_gnyg_336();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}