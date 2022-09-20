package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_gcbzcs;
public class Config_gcbzcs extends ConfigBase<Struct_gcbzcs> {
    private static Config_gcbzcs ins = null;
    public static Config_gcbzcs getIns(){
        if(ins==null){
            ins = new Config_gcbzcs();
        }
        return ins;
    }
    private Config_gcbzcs(){
        put(1,new Struct_gcbzcs(1,"[[4,0,5000]]"));
        put(2,new Struct_gcbzcs(2,"[[4,0,7500]]"));
        put(3,new Struct_gcbzcs(3,"[[4,0,15000]]"));
    }
    public void reset(){
        ins = null;
    }
}