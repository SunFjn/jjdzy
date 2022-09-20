package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_wwzd_227;
public class Config_wwzd_227 extends ConfigBase<Struct_wwzd_227> {
    private static Config_wwzd_227 ins = null;
    public static Config_wwzd_227 getIns(){
        if(ins==null){
            ins = new Config_wwzd_227();
        }
        return ins;
    }
    private Config_wwzd_227(){
        put(1,new Struct_wwzd_227(1,5,"[[4,0,1000],[1,410002,5],[1,400175,100]]"));
        put(2,new Struct_wwzd_227(2,10,"[[4,0,2500],[1,400176,10],[1,410002,5]]"));
        put(3,new Struct_wwzd_227(3,15,"[[1,410029,1],[1,410006,2],[1,400176,10]]"));
        put(4,new Struct_wwzd_227(4,20,"[[1,410029,2],[1,410006,3],[1,400176,30]]"));
    }
    public void reset(){
        ins = null;
    }
}