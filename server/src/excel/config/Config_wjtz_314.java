package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_wjtz_314;
public class Config_wjtz_314 extends ConfigBase<Struct_wjtz_314> {
    private static Config_wjtz_314 ins = null;
    public static Config_wjtz_314 getIns(){
        if(ins==null){
            ins = new Config_wjtz_314();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}