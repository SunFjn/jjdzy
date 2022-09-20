package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_horse_507;
public class Config_horse_507 extends ConfigBase<Struct_horse_507> {
    private static Config_horse_507 ins = null;
    public static Config_horse_507 getIns(){
        if(ins==null){
            ins = new Config_horse_507();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}