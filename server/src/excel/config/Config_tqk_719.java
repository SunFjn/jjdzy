package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tqk_719;
public class Config_tqk_719 extends ConfigBase<Struct_tqk_719> {
    private static Config_tqk_719 ins = null;
    public static Config_tqk_719 getIns(){
        if(ins==null){
            ins = new Config_tqk_719();
        }
        return ins;
    }
    private Config_tqk_719(){
        put(1,new Struct_tqk_719(1,"[[4,0,1500]]",10,0,0,0,6,9,2592000,25001));
        put(2,new Struct_tqk_719(2,"[[4,0,4500],[1,410023,3]]",20,0,0,0,30,10,2592000,25002));
        put(3,new Struct_tqk_719(3,"[[4,0,14888],[1,410029,3]]",40,0,0,1,98,11,0,25003));
    }
    public void reset(){
        ins = null;
    }
}