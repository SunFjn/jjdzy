package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zshd_315;
public class Config_zshd_315 extends ConfigBase<Struct_zshd_315> {
    private static Config_zshd_315 ins = null;
    public static Config_zshd_315 getIns(){
        if(ins==null){
            ins = new Config_zshd_315();
        }
        return ins;
    }
    private Config_zshd_315(){
        put(7102,new Struct_zshd_315(7102));
        put(7103,new Struct_zshd_315(7103));
        put(7104,new Struct_zshd_315(7104));
        put(7105,new Struct_zshd_315(7105));
        put(7106,new Struct_zshd_315(7106));
    }
    public void reset(){
        ins = null;
    }
}