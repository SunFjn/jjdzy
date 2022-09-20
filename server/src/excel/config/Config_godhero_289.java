package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_godhero_289;
public class Config_godhero_289 extends ConfigBase<Struct_godhero_289> {
    private static Config_godhero_289 ins = null;
    public static Config_godhero_289 getIns(){
        if(ins==null){
            ins = new Config_godhero_289();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}