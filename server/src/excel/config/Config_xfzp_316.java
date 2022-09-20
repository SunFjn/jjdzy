package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xfzp_316;
public class Config_xfzp_316 extends ConfigBase<Struct_xfzp_316> {
    private static Config_xfzp_316 ins = null;
    public static Config_xfzp_316 getIns(){
        if(ins==null){
            ins = new Config_xfzp_316();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}