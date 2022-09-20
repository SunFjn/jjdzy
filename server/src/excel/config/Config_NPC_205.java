package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_NPC_205;
public class Config_NPC_205 extends ConfigBase<Struct_NPC_205> {
    private static Config_NPC_205 ins = null;
    public static Config_NPC_205 getIns(){
        if(ins==null){
            ins = new Config_NPC_205();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}