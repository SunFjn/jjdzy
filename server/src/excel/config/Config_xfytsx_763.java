package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xfytsx_763;
public class Config_xfytsx_763 extends ConfigBase<Struct_xfytsx_763> {
    private static Config_xfytsx_763 ins = null;
    public static Config_xfytsx_763 getIns(){
        if(ins==null){
            ins = new Config_xfytsx_763();
        }
        return ins;
    }
    private Config_xfytsx_763(){
        put(1,new Struct_xfytsx_763(1,150,200000));
        put(2,new Struct_xfytsx_763(2,150,200000));
        put(3,new Struct_xfytsx_763(3,150,200000));
        put(4,new Struct_xfytsx_763(4,150,200000));
        put(5,new Struct_xfytsx_763(5,150,200000));
        put(6,new Struct_xfytsx_763(6,150,200000));
        put(7,new Struct_xfytsx_763(7,150,200000));
        put(8,new Struct_xfytsx_763(8,150,200000));
    }
    public void reset(){
        ins = null;
    }
}