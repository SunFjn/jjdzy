package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xyfqhc_508;
public class Config_xyfqhc_508 extends ConfigBase<Struct_xyfqhc_508> {
    private static Config_xyfqhc_508 ins = null;
    public static Config_xyfqhc_508 getIns(){
        if(ins==null){
            ins = new Config_xyfqhc_508();
        }
        return ins;
    }
    private Config_xyfqhc_508(){
        put(448001,new Struct_xyfqhc_508(448001,"[[1,448002,3]]","[[1,448006,1]]"));
        put(448002,new Struct_xyfqhc_508(448002,"[[1,448003,3]]","[[1,448007,1]]"));
    }
    public void reset(){
        ins = null;
    }
}