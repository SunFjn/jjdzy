package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xffp_318;
public class Config_xffp_318 extends ConfigBase<Struct_xffp_318> {
    private static Config_xffp_318 ins = null;
    public static Config_xffp_318 getIns(){
        if(ins==null){
            ins = new Config_xffp_318();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}