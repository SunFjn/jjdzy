package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zshddbcz_315;
public class Config_zshddbcz_315 extends ConfigBase<Struct_zshddbcz_315> {
    private static Config_zshddbcz_315 ins = null;
    public static Config_zshddbcz_315 getIns(){
        if(ins==null){
            ins = new Config_zshddbcz_315();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}