package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zshdljcz_315;
public class Config_zshdljcz_315 extends ConfigBase<Struct_zshdljcz_315> {
    private static Config_zshdljcz_315 ins = null;
    public static Config_zshdljcz_315 getIns(){
        if(ins==null){
            ins = new Config_zshdljcz_315();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}