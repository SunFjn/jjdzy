package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zyxg_766;
public class Config_zyxg_766 extends ConfigBase<Struct_zyxg_766> {
    private static Config_zyxg_766 ins = null;
    public static Config_zyxg_766 getIns(){
        if(ins==null){
            ins = new Config_zyxg_766();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}