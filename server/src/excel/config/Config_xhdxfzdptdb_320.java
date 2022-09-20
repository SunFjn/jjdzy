package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xhdxfzdptdb_320;
public class Config_xhdxfzdptdb_320 extends ConfigBase<Struct_xhdxfzdptdb_320> {
    private static Config_xhdxfzdptdb_320 ins = null;
    public static Config_xhdxfzdptdb_320 getIns(){
        if(ins==null){
            ins = new Config_xhdxfzdptdb_320();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}