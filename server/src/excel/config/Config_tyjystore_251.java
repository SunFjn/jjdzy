package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tyjystore_251;
public class Config_tyjystore_251 extends ConfigBase<Struct_tyjystore_251> {
    private static Config_tyjystore_251 ins = null;
    public static Config_tyjystore_251 getIns(){
        if(ins==null){
            ins = new Config_tyjystore_251();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}