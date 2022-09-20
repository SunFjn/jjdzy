package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_gqmb_205;
public class Config_gqmb_205 extends ConfigBase<Struct_gqmb_205> {
    private static Config_gqmb_205 ins = null;
    public static Config_gqmb_205 getIns(){
        if(ins==null){
            ins = new Config_gqmb_205();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}