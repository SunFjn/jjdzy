package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_leichong2_725;
public class Config_leichong2_725 extends ConfigBase<Struct_leichong2_725> {
    private static Config_leichong2_725 ins = null;
    public static Config_leichong2_725 getIns(){
        if(ins==null){
            ins = new Config_leichong2_725();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}