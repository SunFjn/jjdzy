package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_s12gz_771;
public class Config_s12gz_771 extends ConfigBase<Struct_s12gz_771> {
    private static Config_s12gz_771 ins = null;
    public static Config_s12gz_771 getIns(){
        if(ins==null){
            ins = new Config_s12gz_771();
        }
        return ins;
    }
    private Config_s12gz_771(){
        put(1,new Struct_s12gz_771(1));
        put(2,new Struct_s12gz_771(2));
        put(3,new Struct_s12gz_771(3));
        put(4,new Struct_s12gz_771(4));
        put(5,new Struct_s12gz_771(5));
        put(6,new Struct_s12gz_771(6));
    }
    public void reset(){
        ins = null;
    }
}