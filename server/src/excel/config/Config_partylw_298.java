package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_partylw_298;
public class Config_partylw_298 extends ConfigBase<Struct_partylw_298> {
    private static Config_partylw_298 ins = null;
    public static Config_partylw_298 getIns(){
        if(ins==null){
            ins = new Config_partylw_298();
        }
        return ins;
    }
    private Config_partylw_298(){
        put(1,new Struct_partylw_298(1,"[[4,0,2500]]","[[1,402079,1]]",200));
        put(2,new Struct_partylw_298(2,"[[4,0,10000]]","[[1,402080,1]]",1000));
    }
    public void reset(){
        ins = null;
    }
}