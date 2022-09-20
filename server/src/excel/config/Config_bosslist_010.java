package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bosslist_010;
public class Config_bosslist_010 extends ConfigBase<Struct_bosslist_010> {
    private static Config_bosslist_010 ins = null;
    public static Config_bosslist_010 getIns(){
        if(ins==null){
            ins = new Config_bosslist_010();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}