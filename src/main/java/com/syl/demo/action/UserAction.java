package com.syl.demo.action;


import com.syl.demo.dao.UserDao;
import com.syl.demo.dao.imp.UserDaoImp;
import com.syl.demo.pojo.Role;
import com.syl.demo.pojo.User;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class UserAction extends HttpServlet {

    //@Resource (name = "user")
    UserDaoImp userDao ;

    User user ;

    Role role;

    //Food food;

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    /**
     * Constructor of the object.
     */
    public UserAction () {
    }

    /**
     * Destruction of the servlet. <br>
     */
    public void destroy() {
        super.destroy(); // Just puts "destroy" string in log
        // Put your code here
    }

    /**
     * 表单提交
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //user =  new User();
        String userName = request.getParameter("name");
        String passWord = request.getParameter("password");
        user.setUserName(userName);
        user.setPassWord(passWord);
        if(userDao.findUser(user)){
            System.out.println(userName+" is exist!!");
            request.setAttribute("user",user);
            response.sendRedirect("/login/loginSuccess.jsp");
        }else{
            System.out.println(userName+" is not  exist!!");
            //response.setStatus(404);
            response.sendRedirect("/login/");
        }
           // food.eaten();


    }

    /**
     * The doPost method of the servlet. <br>
     *
     * This method is called when a form has its tag value method equals to post.
     *
     * @param request the request send by the client to the server
     * @param response the response send by the server to the client
     * @throws ServletException if an error occurred
     * @throws IOException if an error occurred
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {



    }

    /**
     * Initialization of the servlet. <br>
     *  此时就完成根据数据库配置文件对将要访问的数据库属性的配置(不一定对)
     * @throws ServletException if an error occurs
     * 第一次请求Servlet时，Servlet容器就会调用这个方法</br>
     * 在后续的请求中，将不再调用该方法</br>
     * 可以利用这个方法来编写一些应用程序初始化相关的代码
     */
    @Override
    public void init(ServletConfig config) throws ServletException {
        // Put your code here

        //DbResource r = new DbResource();
        //ServletContext sc=this.getServletContext();
        //r.getPropertie(sc);


        super.init(config);
        userDao=(UserDaoImp)SpringContextUtil.getBean("userDaoImp");
        user=(User)SpringContextUtil.getBean("user");
        //role=(Role) applicationContext.getBean("role");

    }

}
