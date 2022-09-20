package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_party9_298;
public class Config_party9_298 extends ConfigBase<Struct_party9_298> {
    private static Config_party9_298 ins = null;
    public static Config_party9_298 getIns(){
        if(ins==null){
            ins = new Config_party9_298();
        }
        return ins;
    }
    private Config_party9_298(){
        put(1,new Struct_party9_298(1,"[[4,0,1000]]",5,"[[1,402081,1]]","[[1,402084,1]]",200));
        put(2,new Struct_party9_298(2,"[[4,0,5000]]",3,"[[1,402082,1]]","[[1,402085,1]]",1200));
        put(3,new Struct_party9_298(3,"[[4,0,25000]]",2,"[[1,402083,1]]","[[1,402086,1]]",7500));
    }
    public void reset(){
        ins = null;
    }
}