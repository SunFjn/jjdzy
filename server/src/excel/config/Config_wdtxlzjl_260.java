package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_wdtxlzjl_260;
public class Config_wdtxlzjl_260 extends ConfigBase<Struct_wdtxlzjl_260> {
    private static Config_wdtxlzjl_260 ins = null;
    public static Config_wdtxlzjl_260 getIns(){
        if(ins==null){
            ins = new Config_wdtxlzjl_260();
        }
        return ins;
    }
    private Config_wdtxlzjl_260(){
        put(1,new Struct_wdtxlzjl_260(1,"[[1,400176,10],[1,400899,3]]"));
        put(2,new Struct_wdtxlzjl_260(2,"[[1,400176,20],[1,400899,5]]"));
        put(3,new Struct_wdtxlzjl_260(3,"[[1,400176,10],[1,400899,2]]"));
        put(4,new Struct_wdtxlzjl_260(4,"[[1,400176,20],[1,400899,5]]"));
    }
    public void reset(){
        ins = null;
    }
}