package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hfkhhfsc_286;
public class Config_hfkhhfsc_286 extends ConfigBase<Struct_hfkhhfsc_286> {
    private static Config_hfkhhfsc_286 ins = null;
    public static Config_hfkhhfsc_286 getIns(){
        if(ins==null){
            ins = new Config_hfkhhfsc_286();
        }
        return ins;
    }
    private Config_hfkhhfsc_286(){
        put(1,new Struct_hfkhhfsc_286(1,45,"[[1,434009,1],[1,410005,28],[1,460053,1],[4,0,2500],[1,410406,5]]"));
        put(2,new Struct_hfkhhfsc_286(2,46,"[[1,434010,1],[1,410005,88],[1,400029,4],[4,0,40000],[1,410406,15]]"));
    }
    public void reset(){
        ins = null;
    }
}