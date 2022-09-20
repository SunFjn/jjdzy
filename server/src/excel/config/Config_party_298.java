package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_party_298;
public class Config_party_298 extends ConfigBase<Struct_party_298> {
    private static Config_party_298 ins = null;
    public static Config_party_298 getIns(){
        if(ins==null){
            ins = new Config_party_298();
        }
        return ins;
    }
    private Config_party_298(){
        put(1,new Struct_party_298(1,"[[4,0,25000]]",7,5));
        put(2,new Struct_party_298(2,"[[4,0,100000]]",12,8));
    }
    public void reset(){
        ins = null;
    }
}