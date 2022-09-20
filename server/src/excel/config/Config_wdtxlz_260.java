package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_wdtxlz_260;
public class Config_wdtxlz_260 extends ConfigBase<Struct_wdtxlz_260> {
    private static Config_wdtxlz_260 ins = null;
    public static Config_wdtxlz_260 getIns(){
        if(ins==null){
            ins = new Config_wdtxlz_260();
        }
        return ins;
    }
    private Config_wdtxlz_260(){
        put(1,new Struct_wdtxlz_260(1,5,5,1));
        put(2,new Struct_wdtxlz_260(2,10,10,2));
    }
    public void reset(){
        ins = null;
    }
}