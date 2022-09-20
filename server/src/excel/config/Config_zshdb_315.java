package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zshdb_315;
public class Config_zshdb_315 extends ConfigBase<Struct_zshdb_315> {
    private static Config_zshdb_315 ins = null;
    public static Config_zshdb_315 getIns(){
        if(ins==null){
            ins = new Config_zshdb_315();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}