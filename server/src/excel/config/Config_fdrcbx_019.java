package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdrcbx_019;
public class Config_fdrcbx_019 extends ConfigBase<Struct_fdrcbx_019> {
    private static Config_fdrcbx_019 ins = null;
    public static Config_fdrcbx_019 getIns(){
        if(ins==null){
            ins = new Config_fdrcbx_019();
        }
        return ins;
    }
    private Config_fdrcbx_019(){
        put(1,new Struct_fdrcbx_019(1,2,"[[1,416073,100]]"));
        put(2,new Struct_fdrcbx_019(2,3,"[[1,416088,100]]"));
        put(3,new Struct_fdrcbx_019(3,4,"[[1,416090,80]]"));
        put(4,new Struct_fdrcbx_019(4,5,"[[1,416089,5]]"));
    }
    public void reset(){
        ins = null;
    }
}