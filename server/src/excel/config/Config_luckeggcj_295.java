package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_luckeggcj_295;
public class Config_luckeggcj_295 extends ConfigBase<Struct_luckeggcj_295> {
    private static Config_luckeggcj_295 ins = null;
    public static Config_luckeggcj_295 getIns(){
        if(ins==null){
            ins = new Config_luckeggcj_295();
        }
        return ins;
    }
    private Config_luckeggcj_295(){
        put(1,new Struct_luckeggcj_295(1,"[[4,0,50000]]"));
        put(2,new Struct_luckeggcj_295(2,"[[4,0,62500]]"));
        put(3,new Struct_luckeggcj_295(3,"[[4,0,65000]]"));
        put(4,new Struct_luckeggcj_295(4,"[[4,0,75000]]"));
        put(5,new Struct_luckeggcj_295(5,"[[4,0,90000]]"));
        put(6,new Struct_luckeggcj_295(6,"[[4,0,115000]]"));
        put(7,new Struct_luckeggcj_295(7,"[[4,0,150000]]"));
    }
    public void reset(){
        ins = null;
    }
}