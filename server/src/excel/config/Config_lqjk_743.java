package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lqjk_743;
public class Config_lqjk_743 extends ConfigBase<Struct_lqjk_743> {
    private static Config_lqjk_743 ins = null;
    public static Config_lqjk_743 getIns(){
        if(ins==null){
            ins = new Config_lqjk_743();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}