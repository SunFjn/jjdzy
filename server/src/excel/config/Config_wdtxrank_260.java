package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_wdtxrank_260;
public class Config_wdtxrank_260 extends ConfigBase<Struct_wdtxrank_260> {
    private static Config_wdtxrank_260 ins = null;
    public static Config_wdtxrank_260 getIns(){
        if(ins==null){
            ins = new Config_wdtxrank_260();
        }
        return ins;
    }
    private Config_wdtxrank_260(){
        put(1,new Struct_wdtxrank_260(1,"[[1,1]]","[[1,410115,20],[4,0,5000],[1,400899,40]]",1));
        put(2,new Struct_wdtxrank_260(2,"[[2,2]]","[[1,410115,15],[4,0,4000],[1,400899,30]]",1));
        put(3,new Struct_wdtxrank_260(3,"[[3,3]]","[[1,410115,10],[4,0,4000],[1,400899,25]]",1));
        put(4,new Struct_wdtxrank_260(4,"[[4,4]]","[[4,0,3000],[1,400899,20]]",1));
        put(5,new Struct_wdtxrank_260(5,"[[5,5]]","[[4,0,3000],[1,400899,15]]",1));
        put(6,new Struct_wdtxrank_260(6,"[[6,10]]","[[4,0,2000],[1,400899,10]]",1));
        put(7,new Struct_wdtxrank_260(7,"[[10,999]]","[[4,0,1000],[1,400899,5]]",1));
        put(8,new Struct_wdtxrank_260(8,"[[1,1]]","[[1,410115,20],[4,0,5000],[1,400899,40]]",2));
        put(9,new Struct_wdtxrank_260(9,"[[2,2]]","[[1,410115,15],[4,0,4000],[1,400899,30]]",2));
        put(10,new Struct_wdtxrank_260(10,"[[3,3]]","[[1,410115,10],[4,0,4000],[1,400899,25]]",2));
        put(11,new Struct_wdtxrank_260(11,"[[4,4]]","[[4,0,3000],[1,400899,20]]",2));
        put(12,new Struct_wdtxrank_260(12,"[[5,5]]","[[4,0,3000],[1,400899,15]]",2));
        put(13,new Struct_wdtxrank_260(13,"[[6,10]]","[[4,0,2000],[1,400899,10]]",2));
        put(14,new Struct_wdtxrank_260(14,"[[10,999]]","[[4,0,1000],[1,400899,5]]",2));
    }
    public void reset(){
        ins = null;
    }
}