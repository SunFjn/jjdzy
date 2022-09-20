package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zshdybfl_315;
public class Config_zshdybfl_315 extends ConfigBase<Struct_zshdybfl_315> {
    private static Config_zshdybfl_315 ins = null;
    public static Config_zshdybfl_315 getIns(){
        if(ins==null){
            ins = new Config_zshdybfl_315();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}