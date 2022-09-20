package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cjdjxs3_010;
public class Config_cjdjxs3_010 extends ConfigBase<Struct_cjdjxs3_010> {
    private static Config_cjdjxs3_010 ins = null;
    public static Config_cjdjxs3_010 getIns(){
        if(ins==null){
            ins = new Config_cjdjxs3_010();
        }
        return ins;
    }
    private Config_cjdjxs3_010(){
        put(1,new Struct_cjdjxs3_010(1));
        put(2,new Struct_cjdjxs3_010(2));
        put(3,new Struct_cjdjxs3_010(3));
        put(4,new Struct_cjdjxs3_010(4));
        put(5,new Struct_cjdjxs3_010(5));
        put(6,new Struct_cjdjxs3_010(6));
        put(7,new Struct_cjdjxs3_010(7));
        put(8,new Struct_cjdjxs3_010(8));
    }
    public void reset(){
        ins = null;
    }
}