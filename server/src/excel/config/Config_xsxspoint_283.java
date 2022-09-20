package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xsxspoint_283;
public class Config_xsxspoint_283 extends ConfigBase<Struct_xsxspoint_283> {
    private static Config_xsxspoint_283 ins = null;
    public static Config_xsxspoint_283 getIns(){
        if(ins==null){
            ins = new Config_xsxspoint_283();
        }
        return ins;
    }
    private Config_xsxspoint_283(){
        put(1,new Struct_xsxspoint_283(1,300,"[[1,410092,88]]"));
        put(2,new Struct_xsxspoint_283(2,600,"[[1,410092,188]]"));
        put(3,new Struct_xsxspoint_283(3,1000,"[[1,444009,3]]"));
    }
    public void reset(){
        ins = null;
    }
}