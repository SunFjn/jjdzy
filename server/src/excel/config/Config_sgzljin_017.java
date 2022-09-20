package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgzljin_017;
public class Config_sgzljin_017 extends ConfigBase<Struct_sgzljin_017> {
    private static Config_sgzljin_017 ins = null;
    public static Config_sgzljin_017 getIns(){
        if(ins==null){
            ins = new Config_sgzljin_017();
        }
        return ins;
    }
    private Config_sgzljin_017(){
        put(1,new Struct_sgzljin_017(1,44,"[[4,0,168000],[1,450016,1]]"));
    }
    public void reset(){
        ins = null;
    }
}