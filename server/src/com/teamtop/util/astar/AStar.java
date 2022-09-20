package com.teamtop.util.astar;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.teamtop.system.scene.SceneConst;
//A*算法
public class AStar {
  private int[][] map;//地图(1可�?�?0不可通过)
  private List< Node> openList;//�?��列表
  private List< Node> closeList;//关闭列表
  private final int COST_STRAIGHT = 10;//垂直方向或水平方向移动的路径评分
  private final int COST_DIAGONAL = 14;//斜方向移动的路径评分
  private int row;//�?
  private int column;//�?
  
  public AStar(int[][] map,int row,int column){
      this.map=map;
      this.row=row;
      this.column=column;
      openList=new ArrayList< Node>();
      closeList=new ArrayList< Node>();
  }
  public int[][] searchByPosXY(int x1,int y1,int x2,int y2){
	  int row1 = y1/SceneConst.CANWARL_POSX_TRANS;
	  int col1 = x1/SceneConst.CANWARL_POSX_TRANS;
	  int row2 = y2/SceneConst.CANWARL_POSX_TRANS;
	  int col2 = x2/SceneConst.CANWARL_POSX_TRANS;
	  return searchByRowCol(row1, col1, row2, col2);
  }
  //查找坐标�?1：错误，0：没找到�?：找到了�?
  public int[][] searchByRowCol(int row1,int col1,int row2,int col2){
      if(row1 < 0||row1 >= row||row2 < 0||row2 >= row||col1 < 0||col1>=column||col2< 0||col2>=column){
          return null;
      }
      if(map[row1][col1]==0||map[row2][col2]==0){
          return null;
      }
      Node sNode=new Node(col1,row1,null);
      Node eNode=new Node(col2,row2,null);
      openList.add(sNode);
//      long s = System.currentTimeMillis();
      List< Node> resultList=search(sNode, eNode);
//      long e = System.currentTimeMillis();
//	  System.err.println("search:"+(e-s)+" ms");
      if(resultList.size()==0){
//    	  System.err.println("resultList 1 size is 0");
    	  return null;
      }
      List<Node> smoothing = new ArrayList<Node>();
      smoothPath2(resultList, smoothing);
//      smoothPath(resultList, smoothing);
      
      if(resultList.size()==0){
//    	  System.err.println("resultList 2 size is 0");
          return null;
      }
      int[][] route = new int[smoothing.size()][];
      int i = 0;
      for(Node node:smoothing){
    	  route[i] = new int[]{node.getX()*SceneConst.CANWARL_POSY_TRANS,node.getY()*SceneConst.CANWARL_POSY_TRANS};
//          map[node.getY()][node.getX()]=2;
//          System.err.println(node.getX()+","+node.getY());
          i++;
      }
      return route;
  }
  
  public void smoothPath2(List<Node> sourceList, List<Node> distList) {
	  int size = sourceList.size();
	  int startindex = 0;
	  Node curNode = sourceList.get(startindex);
	  distList.add(curNode);
	  int lastIndex = size - 1;
	  
	  Node sn = sourceList.get(startindex);
	  for(int testindex = lastIndex; testindex > startindex; testindex--) {
		  Node tn = sourceList.get(testindex);
		  if(caculateLink2(sn, tn)) {
			  distList.add(tn);
			  if(testindex == lastIndex) {
				  break;
			  }
			  startindex = testindex;
			  sn = sourceList.get(startindex);
			  testindex = lastIndex + 1;//下一次循环将被设为最后索引
		  }
	  }
  }
  
  //计算两个NODE是否可以直接链接
  public boolean caculateLink2(Node n1, Node n2) {
	  int sx = n1.getX();
	  int sy = n1.getY();
	  int ex = n2.getX();
	  int ey = n2.getY();
	  int dx = (ex - sx);
	  int dy = (ey - sy);
	  
	  double len = Math.sqrt( dx * dx + dy * dy );
	  double counter = 1.0;
	  double rate = 1;
	  boolean ret = true;
	  
	  while( counter < len ) {
		rate = counter / len;
		double ny = rate * dy + sy + 0.5;
		double nx = rate * dx + sx + 0.5;
		if((dx > 0 && nx > ex) || (dx < 0 && nx < ex))
			nx = ex;
		if((dy > 0 && ny > ey) || (dy < 0 && ny < ey))
			ny = ey;
		if(getNodeType((int)ny, (int)nx) == 0) {//0 cant walk
			ret = false;
			break;
		}
		counter = counter + 1.0;
	}
	 return ret;
  }
  
  public void smoothPath(List<Node> sourceList, List<Node> distList) {
	  int size = sourceList.size();
	  int curIndex = 0;
	  Node curNode = sourceList.get(curIndex);
	  distList.add(curNode);
	  
	  while(curIndex < size - 1) {
		  int step = caculateStep(curIndex, sourceList);
		  curIndex = curIndex + step;
		  curNode = sourceList.get(curIndex);
		  distList.add(curNode);
	  }
  }
  
  //从某点出发,贪婪地走
  //出口1:两个区块不可以直接链接
  //出口2:当前步为终点
  public int caculateStep(int startindex, List<Node> sourceList) {
	  Node startNode = sourceList.get(startindex);
	  Node testNode = null;
	  int size = sourceList.size();
	  int step = 1;
	  int testIndex = startindex + step + 1;//下一步索引
	  
	  while( testIndex < size) {
		  testNode = sourceList.get(testIndex);
		  if(caculateLink(startNode, testNode)) {//测试下一步
			  step++;
			  testIndex = startindex + step + 1;
		  }else{
			  break;
		  }
	  }
	  return step;
  }
  
  //计算两个NODE是否可以直接链接
  public boolean caculateLink(Node n1, Node n2) {
	  int sx = n1.getX();
	  int sy = n1.getY();
	  int ex = n2.getX();
	  int ey = n2.getY();
	  int dx = (ex - sx);
	  int dy = (ey - sy);
	  boolean ret = true;
	  
	  double len = Math.sqrt( dx * dx + dy * dy );
	  double counter = 0;
	  double rate = 0;
	  
	  do{
		  counter += 1.0;
		  rate = counter / len;
		  double testy = rate * dy + sy;
		  double testx = rate * dx + sx;
		  if((dx > 0 && testx > ex) || (dx < 0 && testx < ex))
			  testx = ex;
		  if((dy > 0 && testy > ey) || (dy < 0 && testy < ey))
			  testy = ey;
		  if( getNodeType((int)testy, (int)testx) != 1) {
			  ret = false;
			  break;
		  }
	  }while(counter < len);
	  
	  return ret;
  }
  
  //查找核心算法
  private List< Node> search(Node sNode,Node eNode){
      List< Node> resultList=new ArrayList< Node>();
      boolean isFind=false;
      Node node=null;
      while(openList.size()>0){
          // System.out.println(openList);
          //取出�?��列表中最低F值，即第�?��存储的�?的F为最低的
          node=openList.get(0);
          //判断是否找到目标�?
          if(node.getX()==eNode.getX()&&node.getY()==eNode.getY()){
              isFind=true;
              break;
          }
          //�?
          if((node.getY()-1)>=0){
              checkPath(node.getX(),node.getY()-1,node, eNode, COST_STRAIGHT);
          }
          //�?
          if((node.getY()+1)< row){
              checkPath(node.getX(),node.getY()+1,node, eNode, COST_STRAIGHT);
          }
          //�?
          if((node.getX()-1)>=0){
              checkPath(node.getX()-1,node.getY(),node, eNode, COST_STRAIGHT);
          }
          //�?
          if((node.getX()+1)< column){
              checkPath(node.getX()+1,node.getY(),node, eNode, COST_STRAIGHT);
          }
          //左上
          if((node.getX()-1)>=0&&(node.getY()-1)>=0){
              checkPath(node.getX()-1,node.getY()-1,node, eNode, COST_DIAGONAL);
          }
          //左下
          if((node.getX()-1)>=0&&(node.getY()+1)< row){
              checkPath(node.getX()-1,node.getY()+1,node, eNode, COST_DIAGONAL);
          }
          //右上
          if((node.getX()+1)< column&&(node.getY()-1)>=0){
              checkPath(node.getX()+1,node.getY()-1,node, eNode, COST_DIAGONAL);
          }
          //右下
          if((node.getX()+1)< column&&(node.getY()+1)< row){
              checkPath(node.getX()+1,node.getY()+1,node, eNode, COST_DIAGONAL);
          }
          //从开启列表中删除
          //添加到关闭列表中
          closeList.add(openList.remove(0));
          //�?��列表中排序，把F值最低的放到�?���?
          Collections.sort(openList, new NodeFComparator());
           //System.out.println(openList);
      }
      if(isFind){
          getPath(resultList, node);
      }
      return resultList;
  }
  
  public int getNodeType(int row, int col) {
	  int ret = map[row][col];
	  return ret;
  }
  
  //查询此路是否能走�?
  private boolean checkPath(int x,int y,Node parentNode,Node eNode,int cost){
      Node node=new Node(x, y, parentNode);
      //查找地图中是否能通过
      if(map[y][x]==0){
          closeList.add(node);
          return false;
      }
      //查找关闭列表中是否存�?
      if(isListContains(closeList, x, y)!=-1){
          return false;
      }
      //查找�?��列表中是否存�?
      int index=-1;
      if((index=isListContains(openList, x, y))!=-1){
          //G值是否更小，即是否更新G，F�?
          if((parentNode.getG()+cost)< openList.get(index).getG()){
              node.setParentNode(parentNode);
              countG(node, eNode, cost);
              countF(node);
              
              openList.set(index, node);
          }
      }else{
          //添加到开启列表中
          node.setParentNode(parentNode);
          count(node, eNode, cost);
          openList.add(node);
      }
      return true;
  }
  
  //集合中是否包含某个元�?-1：没有找到，否则返回�?��的索�?
  private int isListContains(List< Node> list,int x,int y){
      for(int i=0;i< list.size();i++){
          Node node=list.get(i);
          if(node.getX()==x&&node.getY()==y){
              return i;
          }
      }
      return -1;
  }
  
  //从终点往返回到起�?
  private void getPath(List< Node> resultList,Node node){
      if(node.getParentNode()!=null){
          getPath(resultList, node.getParentNode());
      }
      resultList.add(node);
  }
  
  //计算G,H,F�?
  private void count(Node node,Node eNode,int cost){
      countG(node, eNode, cost);
      countH(node, eNode);
      countF(node);
  }
  //计算G�?
  private void countG(Node node,Node eNode,int cost){
      if(node.getParentNode()==null){
          node.setG(cost);
      }else{
          node.setG(node.getParentNode().getG()+cost);
      }
  }
  //计算H�?
  private void countH(Node node,Node eNode){
      node.setF((Math.abs(node.getX()-eNode.getX())+Math.abs(node.getY()-eNode.getY()))*10);
  }
  //计算F�?
  private void countF(Node node){
      node.setF(node.getG()+node.getH());
  }
  
}
//节点�?
class Node {
  private int x;//X坐标
  private int y;//Y坐标
  private Node parentNode;//父类节点
  private int g;//当前点到起点的移动�?�?
  private int h;//当前点到终点的移动�?费，即曼哈顿距离|x1-x2|+|y1-y2|(忽略障碍�?
  private int f;//f=g+h
  
  public Node(int x,int y,Node parentNode){
      this.x=x;
      this.y=y;
      this.parentNode=parentNode;
  }
  
  public int getX() {
      return x;
  }
  public void setX(int x) {
      this.x = x;
  }
  public int getY() {
      return y;
  }
  public void setY(int y) {
      this.y = y;
  }
  public Node getParentNode() {
      return parentNode;
  }
  public void setParentNode(Node parentNode) {
      this.parentNode = parentNode;
  }
  public int getG() {
      return g;
  }
  public void setG(int g) {
      this.g = g;
  }
  public int getH() {
      return h;
  }
  public void setH(int h) {
      this.h = h;
  }
  public int getF() {
      return f;
  }
  public void setF(int f) {
      this.f = f;
  }
   public String toString(){
      return "("+x+","+y+","+f+")";
   }
}
//节点比较�?
class NodeFComparator implements Comparator< Node>{
  @Override
  public int compare(Node o1, Node o2) {
      return o1.getF()-o2.getF();
  }
  
}