package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_baoxiang_708;
public class Config_baoxiang_708 extends ConfigBase<Struct_baoxiang_708> {
    private static Config_baoxiang_708 ins = null;
    public static Config_baoxiang_708 getIns(){
        if(ins==null){
            ins = new Config_baoxiang_708();
        }
        return ins;
    }
    private Config_baoxiang_708(){
        put(1,new Struct_baoxiang_708(1,60,"[[4,0,500],[3,0,420000],[1,410001,80]]"));
        put(2,new Struct_baoxiang_708(2,120,"[[1,400057,8],[1,400011,8],[9,0,10000]]"));
        put(3,new Struct_baoxiang_708(3,200,"[[4,0,750],[1,410015,3],[1,410002,4]]"));
        put(4,new Struct_baoxiang_708(4,300,"[[4,0,1250],[1,410029,1],[1,410006,1]]"));
    }
    public void reset(){
        ins = null;
    }
}