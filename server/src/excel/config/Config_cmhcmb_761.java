package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cmhcmb_761;
public class Config_cmhcmb_761 extends ConfigBase<Struct_cmhcmb_761> {
    private static Config_cmhcmb_761 ins = null;
    public static Config_cmhcmb_761 getIns(){
        if(ins==null){
            ins = new Config_cmhcmb_761();
        }
        return ins;
    }
    private Config_cmhcmb_761(){
        put(1,new Struct_cmhcmb_761(1,50,"[[1,411012,288]]"));
        put(2,new Struct_cmhcmb_761(2,100,"[[1,402020,1]]"));
        put(3,new Struct_cmhcmb_761(3,200,"[[1,402021,1]]"));
        put(4,new Struct_cmhcmb_761(4,300,"[[1,402022,1]]"));
    }
    public void reset(){
        ins = null;
    }
}