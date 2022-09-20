package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_rice2_290;
public class Config_rice2_290 extends ConfigBase<Struct_rice2_290> {
    private static Config_rice2_290 ins = null;
    public static Config_rice2_290 getIns(){
        if(ins==null){
            ins = new Config_rice2_290();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}