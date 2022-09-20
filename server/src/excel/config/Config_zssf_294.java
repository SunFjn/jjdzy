package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zssf_294;
public class Config_zssf_294 extends ConfigBase<Struct_zssf_294> {
    private static Config_zssf_294 ins = null;
    public static Config_zssf_294 getIns(){
        if(ins==null){
            ins = new Config_zssf_294();
        }
        return ins;
    }
    private Config_zssf_294(){
        put(1,new Struct_zssf_294(1,0,0,14400,"[[20,0,30]]"));
        put(2,new Struct_zssf_294(2,1,9,14400,"[[20,0,30]]"));
        put(3,new Struct_zssf_294(3,2,12,28800,"[[20,0,30]]"));
        put(4,new Struct_zssf_294(4,3,15,28800,"[[20,0,30]]"));
        put(5,new Struct_zssf_294(5,2,10,28800,"[[20,0,60]]"));
    }
    public void reset(){
        ins = null;
    }
}