package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tyjyboss_251;
public class Config_tyjyboss_251 extends ConfigBase<Struct_tyjyboss_251> {
    private static Config_tyjyboss_251 ins = null;
    public static Config_tyjyboss_251 getIns(){
        if(ins==null){
            ins = new Config_tyjyboss_251();
        }
        return ins;
    }
    private Config_tyjyboss_251(){
        put(343001,new Struct_tyjyboss_251(343001,"[[1,410087,2],[1,410006,2],[1,410051,5]]","0",4,0,60));
        put(343002,new Struct_tyjyboss_251(343002,"[[1,402030,5],[1,410006,5],[1,410051,20],[1,410085,5]]","[[4,0,20000]]",4,0,60));
    }
    public void reset(){
        ins = null;
    }
}