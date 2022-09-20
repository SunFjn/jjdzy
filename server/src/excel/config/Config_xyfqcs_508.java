package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xyfqcs_508;
public class Config_xyfqcs_508 extends ConfigBase<Struct_xyfqcs_508> {
    private static Config_xyfqcs_508 ins = null;
    public static Config_xyfqcs_508 getIns(){
        if(ins==null){
            ins = new Config_xyfqcs_508();
        }
        return ins;
    }
    private Config_xyfqcs_508(){
        put(1,new Struct_xyfqcs_508(1,"[[1,3]]","[[1,0],[2,50000],[3,50000],[4,0],[5,0]]"));
        put(2,new Struct_xyfqcs_508(2,"[[4,10]]","[[1,0],[2,10000],[3,50000],[4,20000],[5,20000]]"));
        put(3,new Struct_xyfqcs_508(3,"[[11,99999]]","[[1,390],[2,1249],[3,3123],[4,39023],[5,56206]]"));
    }
    public void reset(){
        ins = null;
    }
}