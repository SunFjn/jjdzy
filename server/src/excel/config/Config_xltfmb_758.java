package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xltfmb_758;
public class Config_xltfmb_758 extends ConfigBase<Struct_xltfmb_758> {
    private static Config_xltfmb_758 ins = null;
    public static Config_xltfmb_758 getIns(){
        if(ins==null){
            ins = new Config_xltfmb_758();
        }
        return ins;
    }
    private Config_xltfmb_758(){
        put(1,new Struct_xltfmb_758(1,30,"[[1,411011,88]]"));
        put(2,new Struct_xltfmb_758(2,100,"[[1,410402,5]]"));
        put(3,new Struct_xltfmb_758(3,150,"[[1,411011,188]]"));
        put(4,new Struct_xltfmb_758(4,200,"[[1,401041,1]]"));
    }
    public void reset(){
        ins = null;
    }
}