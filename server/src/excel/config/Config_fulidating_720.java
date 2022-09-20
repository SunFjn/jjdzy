package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fulidating_720;
public class Config_fulidating_720 extends ConfigBase<Struct_fulidating_720> {
    private static Config_fulidating_720 ins = null;
    public static Config_fulidating_720 getIns(){
        if(ins==null){
            ins = new Config_fulidating_720();
        }
        return ins;
    }
    private Config_fulidating_720(){
        put(4202,new Struct_fulidating_720(4202));
        put(4203,new Struct_fulidating_720(4203));
        put(4204,new Struct_fulidating_720(4204));
        put(4206,new Struct_fulidating_720(4206));
    }
    public void reset(){
        ins = null;
    }
}