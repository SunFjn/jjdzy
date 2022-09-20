package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tyjyswty_251;
public class Config_tyjyswty_251 extends ConfigBase<Struct_tyjyswty_251> {
    private static Config_tyjyswty_251 ins = null;
    public static Config_tyjyswty_251 getIns(){
        if(ins==null){
            ins = new Config_tyjyswty_251();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}