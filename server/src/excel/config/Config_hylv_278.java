package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hylv_278;
public class Config_hylv_278 extends ConfigBase<Struct_hylv_278> {
    private static Config_hylv_278 ins = null;
    public static Config_hylv_278 getIns(){
        if(ins==null){
            ins = new Config_hylv_278();
        }
        return ins;
    }
    private Config_hylv_278(){
        put(1,new Struct_hylv_278(1,2,80,"[[16,0,300],[1,400175,18]]"));
        put(2,new Struct_hylv_278(2,3,120,"[[16,0,500],[1,400175,28]]"));
        put(3,new Struct_hylv_278(3,4,150,"[[16,0,1000],[1,400175,58]]"));
        put(4,new Struct_hylv_278(4,5,200,"[[16,0,3000],[1,400175,88]]"));
    }
    public void reset(){
        ins = null;
    }
}