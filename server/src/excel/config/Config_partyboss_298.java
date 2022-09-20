package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_partyboss_298;
public class Config_partyboss_298 extends ConfigBase<Struct_partyboss_298> {
    private static Config_partyboss_298 ins = null;
    public static Config_partyboss_298 getIns(){
        if(ins==null){
            ins = new Config_partyboss_298();
        }
        return ins;
    }
    private Config_partyboss_298(){
        put(350001,new Struct_partyboss_298(350001,"[[4,0,5000]]","[[1,402087,1]]","[[1,402090,1]]",200,"[[289,705]]"));
        put(350002,new Struct_partyboss_298(350002,"[[4,0,25000]]","[[1,402088,1]]","[[1,402091,1]]",1200,"[[743,954]]"));
        put(350003,new Struct_partyboss_298(350003,"[[4,0,50000]]","[[1,402089,1]]","[[1,402092,1]]",3000,"[[397,1308]]"));
    }
    public void reset(){
        ins = null;
    }
}