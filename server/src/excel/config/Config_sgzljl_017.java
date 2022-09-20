package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgzljl_017;
public class Config_sgzljl_017 extends ConfigBase<Struct_sgzljl_017> {
    private static Config_sgzljl_017 ins = null;
    public static Config_sgzljl_017 getIns(){
        if(ins==null){
            ins = new Config_sgzljl_017();
        }
        return ins;
    }
    private Config_sgzljl_017(){
        put(0,new Struct_sgzljl_017(0,500,"0","0"));
        put(1,new Struct_sgzljl_017(1,1000,"[[1,410049,10]]","[[1,410049,50],[1,412020,500]]"));
        put(2,new Struct_sgzljl_017(2,2000,"[[1,410058,10]]","[[1,410058,50],[1,412020,500]]"));
        put(3,new Struct_sgzljl_017(3,5000,"[[1,400922,1]]","[[1,400923,1],[1,412020,1000]]"));
        put(4,new Struct_sgzljl_017(4,10000,"[[1,410062,2]]","[[1,410062,5],[1,412020,1000]]"));
        put(5,new Struct_sgzljl_017(5,14000,"[[1,410049,15]]","[[1,410049,75],[1,412020,1000]]"));
        put(6,new Struct_sgzljl_017(6,19000,"[[1,410058,40]]","[[1,410058,200],[1,410053,2]]"));
        put(7,new Struct_sgzljl_017(7,24000,"[[1,400926,1]]","[[1,400927,1],[1,410053,2]]"));
        put(8,new Struct_sgzljl_017(8,29000,"[[1,410060,2]]","[[1,410060,5],[1,412020,3000]]"));
        put(9,new Struct_sgzljl_017(9,40000,"[[1,410049,30]]","[[1,410049,150],[1,410050,5]]"));
        put(10,new Struct_sgzljl_017(10,48000,"[[4,0,9488]]","[[4,0,94888],[1,410053,3]]"));
        put(11,new Struct_sgzljl_017(11,56000,"[[1,400920,1]]","[[1,400921,1],[1,410058,300]]"));
        put(12,new Struct_sgzljl_017(12,64000,"[[1,412020,1000]]","[[1,412020,5000],[1,410049,80]]"));
        put(13,new Struct_sgzljl_017(13,72000,"[[1,400910,4]]","[[1,410058,500],[1,400910,20]]"));
        put(14,new Struct_sgzljl_017(14,80000,"[[1,410058,100]]","[[1,412020,7000],[1,410050,10]]"));
        put(15,new Struct_sgzljl_017(15,92000,"[[4,0,19488]]","[[4,0,194888],[1,410053,5]]"));
        put(16,new Struct_sgzljl_017(16,104000,"[[1,410058,200]]","[[1,412021,100],[1,410058,600]]"));
        put(17,new Struct_sgzljl_017(17,116000,"[[1,410060,5]]","[[1,410060,15],[1,410062,15]]"));
        put(18,new Struct_sgzljl_017(18,128000,"[[1,410049,50]]","[[1,412021,300],[1,410049,150]]"));
        put(19,new Struct_sgzljl_017(19,140000,"[[1,412021,50]]","[[1,412021,500],[1,410050,15]]"));
        put(20,new Struct_sgzljl_017(20,154000,"[[4,0,29488]]","[[4,0,948888],[1,410053,10]]"));
        put(21,new Struct_sgzljl_017(21,168000,"[[1,412021,100]]","[[1,412021,1000],[1,410061,15]]"));
        put(22,new Struct_sgzljl_017(22,182000,"[[1,403007,1]]","[[1,400913,1],[1,410058,800]]"));
        put(23,new Struct_sgzljl_017(23,196000,"[[1,412021,150]]","[[1,412021,1500],[1,410049,200]]"));
        put(24,new Struct_sgzljl_017(24,210000,"[[1,410019,5]]","[[1,410060,20],[1,410062,20]]"));
        put(25,new Struct_sgzljl_017(25,228000,"[[1,412021,200]]","[[1,412021,2000],[1,410053,5]]"));
        put(26,new Struct_sgzljl_017(26,246000,"[[1,410049,50]]","[[1,410049,250],[1,410050,20]]"));
        put(27,new Struct_sgzljl_017(27,264000,"[[1,410019,5]]","[[1,410059,20],[1,410061,20]]"));
        put(28,new Struct_sgzljl_017(28,282000,"[[1,412021,250]]","[[1,412021,2500],[1,410049,300]]"));
        put(29,new Struct_sgzljl_017(29,300000,"[[1,400913,1]]","[[1,400912,1],[1,410058,1000]]"));
        put(30,new Struct_sgzljl_017(30,0,"[[4,0,44888]]","[[4,0,2948888],[1,410053,20]]"));
    }
    public void reset(){
        ins = null;
    }
}