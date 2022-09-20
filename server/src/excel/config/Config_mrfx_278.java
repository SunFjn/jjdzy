package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_mrfx_278;
public class Config_mrfx_278 extends ConfigBase<Struct_mrfx_278> {
    private static Config_mrfx_278 ins = null;
    public static Config_mrfx_278 getIns(){
        if(ins==null){
            ins = new Config_mrfx_278();
        }
        return ins;
    }
    private Config_mrfx_278(){
        put(1,new Struct_mrfx_278(1,"[[1,3]]","1,33334;2,33333;3,33333"));
        put(2,new Struct_mrfx_278(2,"[[4,8]]","4,20000;5,20000;6,20000;7,20000;8,20000"));
    }
    public void reset(){
        ins = null;
    }
}