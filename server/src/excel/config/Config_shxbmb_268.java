package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_shxbmb_268;
public class Config_shxbmb_268 extends ConfigBase<Struct_shxbmb_268> {
    private static Config_shxbmb_268 ins = null;
    public static Config_shxbmb_268 getIns(){
        if(ins==null){
            ins = new Config_shxbmb_268();
        }
        return ins;
    }
    private Config_shxbmb_268(){
        put(1,new Struct_shxbmb_268(1,5,"[[1,400910,18]]"));
        put(2,new Struct_shxbmb_268(2,10,"[[1,410049,188]]"));
        put(3,new Struct_shxbmb_268(3,30,"[[1,410058,388]]"));
        put(4,new Struct_shxbmb_268(4,50,"[[1,410050,128]]"));
    }
    public void reset(){
        ins = null;
    }
}