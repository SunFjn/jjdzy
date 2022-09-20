package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_skillstart_210;
public class Config_skillstart_210 extends ConfigBase<Struct_skillstart_210> {
    private static Config_skillstart_210 ins = null;
    public static Config_skillstart_210 getIns(){
        if(ins==null){
            ins = new Config_skillstart_210();
        }
        return ins;
    }
    private Config_skillstart_210(){
        put(1,new Struct_skillstart_210(1,1));
        put(2,new Struct_skillstart_210(2,1));
        put(3,new Struct_skillstart_210(3,1));
    }
    public void reset(){
        ins = null;
    }
}