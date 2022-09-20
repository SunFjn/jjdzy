package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xsxs_283;
public class Config_xsxs_283 extends ConfigBase<Struct_xsxs_283> {
    private static Config_xsxs_283 ins = null;
    public static Config_xsxs_283 getIns(){
        if(ins==null){
            ins = new Config_xsxs_283();
        }
        return ins;
    }
    private Config_xsxs_283(){
        put(1,new Struct_xsxs_283(1));
        put(2,new Struct_xsxs_283(2));
        put(3,new Struct_xsxs_283(3));
        put(4,new Struct_xsxs_283(4));
        put(5,new Struct_xsxs_283(5));
        put(6,new Struct_xsxs_283(6));
        put(7,new Struct_xsxs_283(7));
        put(8,new Struct_xsxs_283(8));
        put(9,new Struct_xsxs_283(9));
        put(10,new Struct_xsxs_283(10));
    }
    public void reset(){
        ins = null;
    }
}