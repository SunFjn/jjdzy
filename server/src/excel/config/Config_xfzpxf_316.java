package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xfzpxf_316;
public class Config_xfzpxf_316 extends ConfigBase<Struct_xfzpxf_316> {
    private static Config_xfzpxf_316 ins = null;
    public static Config_xfzpxf_316 getIns(){
        if(ins==null){
            ins = new Config_xfzpxf_316();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}