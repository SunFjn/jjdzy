package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cjdjxs2_010;
public class Config_cjdjxs2_010 extends ConfigBase<Struct_cjdjxs2_010> {
    private static Config_cjdjxs2_010 ins = null;
    public static Config_cjdjxs2_010 getIns(){
        if(ins==null){
            ins = new Config_cjdjxs2_010();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}