package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xhdjdpm_321;
public class Config_xhdjdpm_321 extends ConfigBase<Struct_xhdjdpm_321> {
    private static Config_xhdjdpm_321 ins = null;
    public static Config_xhdjdpm_321 getIns(){
        if(ins==null){
            ins = new Config_xhdjdpm_321();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}