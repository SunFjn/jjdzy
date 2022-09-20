package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_pmhdsbdjcsb_326;
public class Config_pmhdsbdjcsb_326 extends ConfigBase<Struct_pmhdsbdjcsb_326> {
    private static Config_pmhdsbdjcsb_326 ins = null;
    public static Config_pmhdsbdjcsb_326 getIns(){
        if(ins==null){
            ins = new Config_pmhdsbdjcsb_326();
        }
        return ins;
    }
    private Config_pmhdsbdjcsb_326(){
        put(7214,new Struct_pmhdsbdjcsb_326(7214,30,300));
        put(7215,new Struct_pmhdsbdjcsb_326(7215,20,200));
        put(7306,new Struct_pmhdsbdjcsb_326(7306,20,200));
    }
    public void reset(){
        ins = null;
    }
}