package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hfkhczfl_286;
public class Config_hfkhczfl_286 extends ConfigBase<Struct_hfkhczfl_286> {
    private static Config_hfkhczfl_286 ins = null;
    public static Config_hfkhczfl_286 getIns(){
        if(ins==null){
            ins = new Config_hfkhczfl_286();
        }
        return ins;
    }
    private Config_hfkhczfl_286(){
        put(2,new Struct_hfkhczfl_286(2,6));
        put(3,new Struct_hfkhczfl_286(3,30));
        put(4,new Struct_hfkhczfl_286(4,58));
        put(1,new Struct_hfkhczfl_286(1,98));
    }
    public void reset(){
        ins = null;
    }
}