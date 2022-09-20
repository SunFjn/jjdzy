package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_nian_299;
public class Config_nian_299 extends ConfigBase<Struct_nian_299> {
    private static Config_nian_299 ins = null;
    public static Config_nian_299 getIns(){
        if(ins==null){
            ins = new Config_nian_299();
        }
        return ins;
    }
    private Config_nian_299(){
        put(1,new Struct_nian_299(1,6000,"[[1,402061,1]]",1800,"[[4,0,500]]","0","0",0,"447201"));
        put(2,new Struct_nian_299(2,12000,"[[1,402062,1]]",3600,"[[4,0,1000]]","0","0",2,"447202"));
        put(3,new Struct_nian_299(3,36000,"[[1,402063,1]]",7200,"[[4,0,2500]]","0","0",5,"447203"));
        put(4,new Struct_nian_299(4,48000,"[[1,402064,1]]",10800,"[[4,0,4000]]","0","0",9,"447204"));
        put(5,new Struct_nian_299(5,72000,"[[1,402065,1]]",10800,"[[4,0,4000]]","12:00:00","14:00:00",15,"447205"));
    }
    public void reset(){
        ins = null;
    }
}