package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hdts_313;
public class Config_hdts_313 extends ConfigBase<Struct_hdts_313> {
    private static Config_hdts_313 ins = null;
    public static Config_hdts_313 getIns(){
        if(ins==null){
            ins = new Config_hdts_313();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}