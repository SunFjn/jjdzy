package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hfkhzfzjjiu_286;
public class Config_hfkhzfzjjiu_286 extends ConfigBase<Struct_hfkhzfzjjiu_286> {
    private static Config_hfkhzfzjjiu_286 ins = null;
    public static Config_hfkhzfzjjiu_286 getIns(){
        if(ins==null){
            ins = new Config_hfkhzfzjjiu_286();
        }
        return ins;
    }
    private Config_hfkhzfzjjiu_286(){
        put(1,new Struct_hfkhzfzjjiu_286(1,10,"[[1,402017,1]]",5,"[[4,0,500]]","[[1,410404,1]]"));
        put(2,new Struct_hfkhzfzjjiu_286(2,20,"[[1,402018,1]]",5,"[[4,0,1000]]","[[1,410405,1]]"));
        put(3,new Struct_hfkhzfzjjiu_286(3,50,"[[1,402019,1]]",15,"[[4,0,4000]]","[[1,410406,1]]"));
    }
    public void reset(){
        ins = null;
    }
}