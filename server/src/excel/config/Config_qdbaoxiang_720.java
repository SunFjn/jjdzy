package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qdbaoxiang_720;
public class Config_qdbaoxiang_720 extends ConfigBase<Struct_qdbaoxiang_720> {
    private static Config_qdbaoxiang_720 ins = null;
    public static Config_qdbaoxiang_720 getIns(){
        if(ins==null){
            ins = new Config_qdbaoxiang_720();
        }
        return ins;
    }
    private Config_qdbaoxiang_720(){
        put(3,new Struct_qdbaoxiang_720(3,"[[1,400878,1],[1,400057,10],[1,400022,1]]"));
        put(5,new Struct_qdbaoxiang_720(5,"[[1,400878,1],[1,400057,20],[1,400022,1]]"));
        put(7,new Struct_qdbaoxiang_720(7,"[[1,400878,1],[1,400057,20],[1,400023,1]]"));
        put(15,new Struct_qdbaoxiang_720(15,"[[1,400085,1],[1,400057,40],[1,400023,1]]"));
        put(30,new Struct_qdbaoxiang_720(30,"[[1,400134,1],[1,400057,80],[1,400024,1]]"));
    }
    public void reset(){
        ins = null;
    }
}